import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { EditorHomeClient } from "@/components/editor/editor-home-client";
import { getProjectsForUser } from "@/lib/projects";

export const instant = false;

export default async function EditorPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  const email = user?.emailAddresses[0]?.emailAddress ?? "";

  const { owned, shared } = await getProjectsForUser(userId, email);

  return (
    <EditorHomeClient
      ownedProjects={owned.map((p) => ({ id: p.id, name: p.name }))}
      sharedProjects={shared.map((s) => ({ id: s.id, name: s.name }))}
    />
  );
}
