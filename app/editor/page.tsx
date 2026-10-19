"use client";

import { useState } from "react";
import ProjectSidebar from "@/components/editor/project-sidebar";
import EditorNavbar from "@/components/editor/editor-navbar";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import useProjectDialogs from "@/hooks/use-project-dialogs";
import ProjectDialogs from "@/components/editor/project-dialogs";

export default function EditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const dialogs = useProjectDialogs();

  return (
    <div className="h-screen flex flex-col bg-bg-base">
      <EditorNavbar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        projects={dialogs.projects}
        onNewProject={dialogs.openCreate}
        onRename={dialogs.openRename}
        onDelete={dialogs.openDelete}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 overflow-hidden flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-medium text-text-primary">
              Create a project or open an existing one
            </h1>
            <p className="text-sm text-text-muted">
              Start a new architecture workspace, or choose a project from the
              sidebar.
            </p>
          </div>
          <Button onClick={dialogs.openCreate} className="gap-2">
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      </main>
      <ProjectDialogs {...dialogs} />
    </div>
  );
}
