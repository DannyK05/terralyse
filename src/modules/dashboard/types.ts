export type TSoilDataType = {
  YEAR: number;
  LAT: number;
  LON: number;
  JAN: number;
  FEB: number;
  MAR: number;
  APR: number;
  MAY: number;
  JUN: number;
  JUL: number;
  AUG: number;
  SEP: number;
  OCT: number;
  NOV: number;
  DEC: number;
  ANN?: number;
}[];

export type TSoilDataTypeWithParams = {
  PARAMETER: string;
  YEAR: number;
  LAT: number;
  LON: number;
  JAN: number;
  FEB: number;
  MAR: number;
  APR: number;
  MAY: number;
  JUN: number;
  JUL: number;
  AUG: number;
  SEP: number;
  OCT: number;
  NOV: number;
  DEC: number;
  ANN?: number;
}[];

export type TSoilWetnessParams = "top-soil" | "root-soil";

export type THumidityParams =
  | "specific-humidity"
  | "relative-humidity"
  | "average-precipitation"
  | "sum-average-precipitation";

export type TGraphProps = {
  lat: number;
  lng: number;
  param?: TSoilWetnessParams | THumidityParams;
};

export type TSoilFactor = {
  name: string;
  description: string;
  hasParams?: boolean;
  Graph: React.ComponentType<TGraphProps>;
};

export type TChartData = Record<string, number | string>