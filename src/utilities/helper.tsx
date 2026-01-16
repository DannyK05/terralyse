import { colors } from "./data/chart-colors";
import type { TSoilDataType } from "@/modules/dashboard/types";

export const convertHypenStringToRegular = (text: string) => {
  const regularText = text.split("-");

  return `${regularText[0]} ${regularText[1]}`;
};

export const getYearColor = (YEAR: number) => {
  const yearColor = colors.find((color) => color.year === YEAR);
  return yearColor?.color;
};

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

export const generateRechartData = (data: TSoilDataType) => {
  return MONTHS.map((month) => {
    const monthEntry: Record<string, number | string> = {
      month,
    };

    data.forEach((yearData) => {
      monthEntry[yearData.YEAR] = yearData[month];
    });

    return monthEntry;
  });
};
