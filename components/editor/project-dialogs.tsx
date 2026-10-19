"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { useProjectActions } from "@/hooks/use-project-actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type ProjectDialogProps = ReturnType<typeof useProjectActions>;

export default function ProjectDialogs({
  dialogType,
  activeProject,
  name,
  roomId,
  isLoading,
  error,
  close,
  handleNameChange,
  submit,
}: ProjectDialogProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close();
    }
  };

  return (
    <>
      <Dialog open={dialogType === "create"} onOpenChange={handleOpenChange}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Give your project a name to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Project Name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              autoFocus
            />
            <p>{roomId ? roomId : "No room ID generated"}</p>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter showCloseButton>
            <Button onClick={submit} disabled={!name.trim() || isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogType === "rename"} onOpenChange={handleOpenChange}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
            <DialogDescription>
              Renaming &ldquo;{activeProject?.name}&rdquo;
            </DialogDescription>
          </DialogHeader>

          <Input
            placeholder="Project name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim()) submit();
            }}
            autoFocus
          />
          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter showCloseButton>
            <Button onClick={submit} disabled={!name.trim() || isLoading}>
              {isLoading ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogType === "delete"} onOpenChange={handleOpenChange}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{activeProject?.name}
              &rdquo;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter showCloseButton>
            <Button variant="destructive" onClick={submit} disabled={isLoading}>
              {isLoading ? "Deleting…" : "Delete Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
