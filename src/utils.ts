import {
  Activity,
  Character,
  IncompatibleActivitiesAndPackages,
} from "./types";

export const getMinMaxDates = () => {
  const today = new Date();

  // Create a date 2 days in the future
  const twoDaysInAdvance = new Date(today);
  twoDaysInAdvance.setDate(today.getDate() + 2);
  if (twoDaysInAdvance.getDay() === 0) {
    twoDaysInAdvance.setDate(twoDaysInAdvance.getDate() + 1);
  }

  // Create a date one year in the future
  const oneYearInAdvance = new Date(today);
  oneYearInAdvance.setFullYear(today.getFullYear() + 1);

  return { twoDaysInAdvance, oneYearInAdvance };
};

export const capitalize = (sentence: string) => {
  const words = sentence.split(" ");

  const capitalizedWords = words.map((word) => {
    // If the word is not empty, capitalize its first letter
    if (word.length > 0) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return word;
    }
  });

  const capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
};

export const verifyActivityIsCompatibleWithAllPackages = (
  currActivity: Activity,
  incompatibleActivitiesAndPackages: IncompatibleActivitiesAndPackages[]
) => {
  if (
    !incompatibleActivitiesAndPackages.every(
      (item) => item.activityId !== currActivity.id
    )
  ) {
    const incompatiblePackages = incompatibleActivitiesAndPackages
      .filter((item) => item.activityId === currActivity.id)
      .map((item) => item.packageName);

    const incompatiblePackagesRefined = [...new Set(incompatiblePackages)];

    const packages =
      incompatiblePackagesRefined.length > 1
        ? capitalize(incompatiblePackagesRefined.join(", "))
        : capitalize(incompatiblePackagesRefined[0]);

    return `${capitalize(currActivity.name)} (not available for ${packages} ${
      incompatiblePackagesRefined.length > 1 ? "packages" : "package"
    })`;
  }
  return capitalize(currActivity.name);
};

export const multiSelectionHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  currSelectionArr: string[],
  setSelectionArrState: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const itemIsSelected = currSelectionArr.find(
    (itemName) => itemName === e.target.id
  );
  setSelectionArrState((prev) =>
    !itemIsSelected
      ? [...prev, e.target.id]
      : prev.filter((itemName) => itemName !== e.target.id)
  );
};

export const isCharacterInSelection = (
  charSelection: Character[],
  currChar: Character
) => {
  const charNameCostumePairs = charSelection.map(
    (char) => char.name + char.costume
  );
  const charNameInSelection = !charNameCostumePairs.every(
    (pair) => !pair.includes(currChar.name)
  );
  const charIsNotSelected = !charSelection.includes(currChar);
  return charNameInSelection && charIsNotSelected;
};

// Display "face paint" last.
export const sortActivities = (activities: Activity[]) => {
  return activities.sort((a, b) => {
    if (a.name === "face paint") return 1;
    if (b.name === "face paint") return -1;
    return a.name.localeCompare(b.name);
  });
};
