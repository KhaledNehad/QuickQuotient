import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortObject(object: { [key: string]: number }) {
  const sortedKeys = Object.keys(object).sort();

  const sortedVote: { [key: string]: number } = {};
  sortedKeys.forEach((key) => {
    sortedVote[key] = object[key];
  });
  return sortedVote;
}

export function nextWeek() {
  let currentDate = new Date();
  let nextWeekDate = new Date();
  nextWeekDate.setDate(currentDate.getDate() + 7);
  return nextWeekDate;
}
