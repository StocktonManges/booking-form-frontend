import z from "zod";

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  isActive: z.boolean(),
});
export type Character = z.infer<typeof characterSchema>;

export const packageSchema = z.object({
  id: z.number(),
  name: z.string(),
  activityCount: z.number(),
});
export type Package = z.infer<typeof packageSchema>;

export const activitySchema = z.object({
  id: z.number(),
  name: z.string(),
  isActive: z.boolean(),
});
export type Activity = z.infer<typeof activitySchema>;

export const packageNameSchema = z.union([
  z.literal("wish"),
  z.literal("dream"),
  z.literal("fantasy"),
]);
export type PackageNames = z.infer<typeof packageNameSchema>;

export const incompatibleActivitiesAndPackagesSchema = z.object({
  id: z.number(),
  activityId: z.number(),
  packageId: z.number(),
});
export type IncompatibleActivitiesAndPackages = z.infer<
  typeof incompatibleActivitiesAndPackagesSchema
>;
