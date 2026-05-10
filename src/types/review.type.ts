export interface IReviewSummary {
  totalReviews: number;
  averageGuideRating: number;
  averageServiceRating: number;
  averageTransportationRating: number;
  averageOrganizationRating: number;
  overallRating: number;
}

export interface IReviewUser {
  name: string;
  picture?: string;
}

export interface IReview {
  _id: string;
  name: string;
  picture?: string;
  createdAt: string;
  guideRating: number;
  serviceRating: number;
  transportationRating: number;
  organizationRating: number;
  comment: string;
  images: string[];
  overallRating: number;
}

export interface IUserReview {
  _id: string;
  tourTitle: string;
  tourSlug: string;
  createdAt: string;
  guideRating: number;
  serviceRating: number;
  transportationRating: number;
  organizationRating: number;
  comment: string;
  images: string[];
  overallRating: number;
}

export interface IAdminReview {
  _id: string;
  tourTitle: string;
  tourSlug: string;
  createdAt: string;
  userName: string;
  userEmail: string;
  guideRating: number;
  serviceRating: number;
  transportationRating: number;
  organizationRating: number;
  comment: string;
  images: string[];
  overallRating: number;
}

export interface ITourReviewResponse {
  summary: IReviewSummary;
  reviews: IReview[];
}

export interface IReviewEligibility {
  canReview: boolean;
  hasBooked: boolean;
  alreadyReviewed: boolean;
  bookingId: string | null;
}
