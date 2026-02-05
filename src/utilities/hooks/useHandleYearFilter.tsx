import { useState } from "react";

export default function useHandleYearFilter() {
  const [selectedYears, setSelectedYears] = useState<number[]>([]);

  const addSelectedYear = (year: number) => {
    setSelectedYears((prev) => [...prev, year]);
  };

  const removeSelectedYear = (year: number) => {
    const formattedYears = selectedYears.filter((years) => years !== year);
    setSelectedYears(formattedYears);
  };

  return { selectedYears, addSelectedYear, removeSelectedYear };
}
