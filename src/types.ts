import z from "zod";
import BookingForm from "./components/BookingForm";

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  costume: z.union([z.string(), z.null()]),
  isActive: z.boolean(),
});
export type Character = z.infer<typeof characterSchema>;

export const packageSchema = z.object({
  id: z.number(),
  name: z.string(),
  activityCount: z.number(),
  durationInMinutes: z.number(),
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
  activityName: z.string(),
  packageName: z.string(),
});
export type IncompatibleActivitiesAndPackages = z.infer<
  typeof incompatibleActivitiesAndPackagesSchema
>;

// React Calendar specific types.
export type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

export const bookingFormSchema = z.object({
  id: z.number().optional(),
  email: z.string(),
  parentName: z.string(),
  phoneNumber: z.string(),
  dateTime: z.date(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
  }),
  outdoors: z.boolean(),
  packageName: z.string(),
  participants: z.number(),
  minParticipantAge: z.number(),
  maxParticipantAge: z.number(),
  birthdayChildName: z.string(),
  birthdayChildAge: z.number(),
  firstInteraction: z.string(),
  notes: z.string(),
  couponCode: z.string(),
  referralCode: z.string(),
  howDidYouFindUs: z.string(),
  charactersAtEvent: z.array(z.string()),
  activitiesForEvent: z.array(z.string()),
  status: z.number(),
});
export type BookingForm = z.infer<typeof bookingFormSchema>;

export const submitBookingFormResponseSchema = z.object({
  message: z.string(),
  newEvent: bookingFormSchema,
});
export type SubmitBookingFormResponse = z.infer<
  typeof submitBookingFormResponseSchema
>;

export type PhoneInputState = [string, string, string];
