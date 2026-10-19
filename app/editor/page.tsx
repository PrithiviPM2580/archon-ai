"use client";

import { useState } from "react";
import ProjectSidebar from "@/components/editor/project-sidebar";
import EditorNavbar from "@/components/editor/editor-navbar";

export default function EditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <div className="h-screen flex flex-col bg-bg-base">
      <EditorNavbar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
}
