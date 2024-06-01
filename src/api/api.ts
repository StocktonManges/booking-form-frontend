import { z } from "zod";
import {
  Activity,
  BookingForm,
  Character,
  IncompatibleActivitiesAndPackages,
  Package,
  SubmitBookingFormResponse,
  activitySchema,
  characterSchema,
  incompatibleActivitiesAndPackagesSchema,
  packageSchema,
  submitBookingFormResponseSchema,
} from "../types";

// const baseURL = "https://bookingform-jhcx7uxfca-uc.a.run.app/";
const baseURL =
  "http://127.0.0.1:5001/booking-form-a7791/us-central1/bookingForm/";

export const API = {
  getCharacters: (): Promise<Character[]> =>
    fetch(baseURL + "character")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch characters.");
        }

        return response.json();
      })
      .then((allCharacters) => z.array(characterSchema).parse(allCharacters)),

  getPackages: (): Promise<Package[]> =>
    fetch(baseURL + "package")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch packages.");
        }

        return response.json();
      })
      .then((allPackages) => z.array(packageSchema).parse(allPackages)),

  getActivities: (): Promise<Activity[]> =>
    fetch(baseURL + "activity")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch activities.");
        }

        return response.json();
      })
      .then((allActivities) => z.array(activitySchema).parse(allActivities)),

  getIncompatibleActivitiesAndPackages: (): Promise<
    IncompatibleActivitiesAndPackages[]
  > =>
    fetch(baseURL + "incompatibleActivitiesAndPackages")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Unable to fetch incompatible activities and packages."
          );
        }

        return response.json();
      })
      .then((allData) =>
        z.array(incompatibleActivitiesAndPackagesSchema).parse(allData)
      ),

  submitBookingForm: (
    bookingFormData: BookingForm
  ): Promise<SubmitBookingFormResponse> =>
    fetch(baseURL + "event", {
      method: "POST",
      body: JSON.stringify(bookingFormData),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error submitting booking form.");
      }
      return submitBookingFormResponseSchema.parse(response.json());
    }),
};
