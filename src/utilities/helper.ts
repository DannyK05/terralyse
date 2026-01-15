import { colors } from "./data/chart-colors";
import type {
  TSoilDataType,
  TSoilDataTypeWithParams,
} from "@/modules/dashboard/types";

export const convertHypenStringToRegular = (text: string) => {
  const regularText = text.split("-");

  return `${regularText[0]} ${regularText[1]}`;
};

export const getYearColor = (YEAR: number) => {
  const yearColor = colors.find((color) => color.year === YEAR);
  return yearColor?.color;
};

export const generateChartData = (
  data: TSoilDataType | TSoilDataTypeWithParams
) => {
  return data.map(
    ({ YEAR, JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC }) => {
      return {
        label: `${YEAR}`,
        data: [JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC],
        borderColor: getYearColor(YEAR),
        backgroundColor: getYearColor(YEAR),
        borderWidth: 3,
        fill: false,
      };
    }
  );
};
