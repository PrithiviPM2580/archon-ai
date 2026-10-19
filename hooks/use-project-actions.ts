"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export interface ProjectRow {
  id: string;
  name: string;
}

export type DialogType = "create" | "rename" | "delete" | null;

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function shortSuffix(): string {
  return Math.random().toString(36).slice(2, 6);
}

export function useProjectActions() {
  const router = useRouter();
  const pathname = usePathname();

  const [dialogType, setDialogType] = useState<DialogType>(null);
  const [activeProject, setActiveProject] = useState<ProjectRow | null>(null);
  const [name, setName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [suffix, setSuffix] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    const s = shortSuffix();
    setSuffix(s);
    setName("");
    setRoomId("");
    setError(null);
    setActiveProject(null);
    setDialogType("create");
  };

  const openRename = (project: ProjectRow) => {
    setName(project.name);
    setRoomId("");
    setError(null);
    setActiveProject(project);
    setDialogType("rename");
  };

  const openDelete = (project: ProjectRow) => {
    setActiveProject(project);
    setError(null);
    setDialogType("delete");
  };

  const close = () => {
    setDialogType(null);
    setActiveProject(null);
    setName("");
    setRoomId("");
    setError(null);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    const s = toSlug(value);
    setRoomId(s ? `${s}-${suffix}` : "");
  };

  const submit = async () => {
    if (!name.trim() && dialogType !== "delete") return;
    setIsLoading(true);
    setError(null);
    try {
      if (dialogType === "create") {
        const finalRoomId = roomId || `${toSlug(name.trim())}-${suffix}`;
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), id: finalRoomId }),
        });
        if (!res.ok) {
          const payload = (await res.json().catch(() => null)) as {
            message?: string;
          } | null;
          throw new Error(payload?.message ?? "Unable to create project");
        }
        close();
        router.refresh();
      } else if (dialogType === "rename" && activeProject) {
        const res = await fetch(`/api/projects/${activeProject.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim() }),
        });
        if (!res.ok) throw new Error("Unable to rename project");
        close();
        router.refresh();
      } else if (dialogType === "delete" && activeProject) {
        const res = await fetch(`/api/projects/${activeProject.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Unable to delete project");
        const isActive = pathname === `/editor/${activeProject.id}`;
        close();
        if (isActive) {
          router.push("/editor");
        } else {
          router.refresh();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    dialogType,
    activeProject,
    name,
    roomId,
    isLoading,
    error,
    openCreate,
    openRename,
    openDelete,
    close,
    handleNameChange,
    submit,
  };
}
