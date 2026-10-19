import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateRequest } from "@/lib/validate-request";
import { updateProjectSchema } from "@/schema/project";

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ projectId: string }> },
) {
  const { userId } = await auth();

  if (!userId)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const { projectId } = await ctx.params;

  const project = await prisma.project.findUnique({ where: { id: projectId } });

  if (!project)
    return Response.json({ message: "Project not found" }, { status: 404 });
  if (project.ownerId !== userId)
    return Response.json({ message: "Forbidden" }, { status: 403 });

  const body = await req.json();

  const { name } = validateRequest(updateProjectSchema, body);

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: { name },
  });

  return Response.json({ project: updatedProject }, { status: 200 });
}

export async function DELETE(
  _request: NextRequest,
  ctx: { params: Promise<{ projectId: string }> },
) {
  const { userId } = await auth();

  if (!userId)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const { projectId } = await ctx.params;

  const project = await prisma.project.findUnique({ where: { id: projectId } });

  if (!project)
    return Response.json({ message: "Project not found" }, { status: 404 });

  if (project.ownerId !== userId)
    return Response.json({ message: "Forbidden" }, { status: 403 });

  await prisma.project.delete({ where: { id: projectId } });

  return Response.json({ message: "Project deleted" }, { status: 204 });
}
