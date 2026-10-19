"use client";

import { Pencil, Plus, Trash2, X } from "lucide-react";
import type { Project } from "@/hooks/use-project-dialogs";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onNewProject: () => void;
  onRename: (project: Project) => void;
  onDelete: (project: Project) => void;
}

interface ProjectItemProps {
  project: Project;
  onRename?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

export default function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onNewProject,
  onRename,
  onDelete,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((o) => o.owned);
  const sharedProjects = projects.filter((o) => !o.owned);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-72 flex-col border-r border-border-default bg-bg-surface transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="h-12 shrink-0 flex items-center justify-between px-4 border-b border-border-default">
          <span className="text-sm font-medium text-text-primary">Project</span>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="size-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <div className="flex flex-col overflow-hidden p-3">
          <Tabs defaultValue="my-projects" className="flex-1 flex flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="my-projects" className="flex-1">
                My Projects
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex-1">
                Shared
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="my-projects"
              className="flex-1 flex items-center justify-center"
            >
              {ownedProjects.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-text-muted">No projects yet</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-0.5">
                  {ownedProjects.map((project) => (
                    <li key={project.id}>
                      <ProjectItem
                        project={project}
                        onRename={onRename}
                        onDelete={onDelete}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
            <TabsContent
              value="shared"
              className="flex-1 flex items-center justify-center"
            >
              {sharedProjects.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-text-muted">No shared projects</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-0.5">
                  {sharedProjects.map((project) => (
                    <li key={project.id}>
                      <ProjectItem project={project} />
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </div>
        <div className="shrink-0 p-3 border-t border-border-default">
          <Button
            variant="default"
            size="default"
            className="w-full gap-2"
            onClick={onNewProject}
          >
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}

function ProjectItem({ project, onRename, onDelete }: ProjectItemProps) {
  return (
    <div className="group flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/50 cursor-pointer">
      <span className="flex-1 text-sm truncate text-text-primary ">
        {project.name}
      </span>
      {onRename && onDelete && (
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              onRename(project);
            }}
          >
            <Pencil className="size-3.5" />
            <span className="sr-only">Rename</span>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project);
            }}
          >
            <Trash2 className="size-3.5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      )}
    </div>
  );
}
