import z from "zod";

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Character = z.infer<typeof characterSchema>;

export const packageSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Package = z.infer<typeof packageSchema>;
