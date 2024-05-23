export const getMinMaxDates = () => {
  const today = new Date();

  // Create a date 2 days in the future
  const twoDaysInAdvance = new Date(today);
  twoDaysInAdvance.setDate(today.getDate() + 2);

  // Create a date one year in the future
  const oneYearInAdvance = new Date(today);
  oneYearInAdvance.setFullYear(today.getFullYear() + 1);

  return { twoDaysInAdvance, oneYearInAdvance };
};
