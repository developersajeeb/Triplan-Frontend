export interface ITourType {
    _id: string;
    name: string;
}

export interface ITourBatch {
  _id: string;
  costFrom: number;
  sellingPrice: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  regEndDate: string;
  maxSeat: number;
  bookedSeat?: number;
  remainingSeat?: number;
}

export interface ITourFaqItem {
  question: string;
  answer: string;
}

export interface ITourPackage {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  regEndDate: string;
  arrivalLocation: string;
  departureLocation: string;
  description: string;
  costFrom: number;
  sellingPrice?: number;
  maxGuest: number;
  minAge: number;
  division: string;
  divisionName: string;
  tourType: string;
  tourTypeName: string;
  amenities: string[];
  included: string[];
  excluded: string[];
  tourPlan: string[];
  faq?: ITourFaqItem[];
  batches?: ITourBatch[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}