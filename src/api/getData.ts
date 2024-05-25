const baseURL = "https://bookingform-jhcx7uxfca-uc.a.run.app/";

export const API = {
  getCharacters: () =>
    fetch(baseURL + "character").then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch characters.");
      }

      return response.json();
    }),
};
