import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { validateRequest } from "@/lib/validate-request";
import { createProjectSchema } from "@/schema/project";

export async function GET() {
  const { userId } = await auth();

  if (!userId)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const projects = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(projects);
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const { id, name } = validateRequest(createProjectSchema, body);

  const project = await prisma.project.create({
    data: {
      id,
      ownerId: userId,
      name,
    },
  });

  return Response.json({ project }, { status: 201 });
}
