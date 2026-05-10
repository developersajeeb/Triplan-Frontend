import type { ITourPackage } from "./tour.type";

export type SelectOption = {
  value: string;
  label: string;
};

export type TourBatchPayload = {
  batchNo: number;
  costFrom: number;
  sellingPrice: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  regEndDate: string;
  maxSeat: number;
  minAge: number;
};

export type TourPayload = Pick<
  ITourPackage,
  | "title"
  | "description"
  | "departureLocation"
  | "arrivalLocation"
  | "costFrom"
  | "sellingPrice"
  | "minAge"
  | "startDate"
  | "endDate"
  | "regEndDate"
  | "included"
  | "excluded"
  | "amenities"
  | "tourPlan"
  | "division"
  | "tourType"
  | "divisionName"
  | "tourTypeName"
> & {
  faq: NonNullable<ITourPackage["faq"]>;
  batches: TourBatchPayload[];
  deleteImages: string[];
};
