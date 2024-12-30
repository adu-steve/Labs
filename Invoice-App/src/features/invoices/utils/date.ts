export const stringToDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return new Date(+year, +month - 1, +day);
};

export const dateToString = (date: Date) => date.toISOString().split("T")[0];
