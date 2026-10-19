import { z } from "zod";

export const createProjectSchema = z.object({
  id: z.string().trim().min(1).optional(),
  name: z
    .string()
    .trim()
    .transform((name) => name || "Untitled Project")
    .optional()
    .default("Untitled Project"),
});

export const updateProjectSchema = z.object({
  name: z.string().trim().optional(),
});
