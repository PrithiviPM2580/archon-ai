import { prisma } from "./prisma";

export async function getProjectsForUser(userId: string, email: string) {
  const [owned, collaborations] = await Promise.all([
    prisma.project.findMany({
      where: { id: userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.projectCollaborator.findMany({
      where: { email },
      include: { project: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    owned,
    shared: collaborations.map((collaboration) => collaboration.project),
  };
}
