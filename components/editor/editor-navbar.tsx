"use client";

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";

interface EditorNavbarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function EditorNavbar({ isOpen, onToggle }: EditorNavbarProps) {
  return (
    <header className="h-12 flex items-center justify-between shrink-0 px-3 bg-bg-surface border-b border-border-default">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onToggle}>
          {isOpen ? (
            <PanelLeftCloseIcon className="size-5" />
          ) : (
            <PanelLeftOpenIcon className="size-5" />
          )}
          <span className="sr-only">Toogle sidebar</span>
        </Button>
      </div>
      <div className="flex-1" />
      <div className="flex items-center">
        <UserButton />
      </div>
    </header>
  );
}
