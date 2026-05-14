import { baseApi } from "@/redux/baseApi";

export type IEarningQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  paymentStatus?: string;
  sort?: string;
};

export type IEarningsData = {
  id: string;
  tourName?: string;
  customer?: string;
  destination?: string;
  amount?: number;
  status?: string;
  date?: string;
  createdAt?: string;
  guestCount?: number;
  tour?: {
    title: string;
    arrivalLocation?: string;
  };
  user?: {
    name: string;
  };
  payment?: {
    amount: number;
    status: string;
    transactionId: string;
    createdAt?: string;
  };
};

export type IEarningsResponse = {
  data: IEarningsData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type IDashboardStats = {
  totalRevenue: number;
  totalBookings: number;
  activeUsers: number;
  averageRating: number;
};

export type IDashboardTrend = {
  revenueChange: number;
  bookingsChange: number;
  activeUsersChange: number;
  averageRatingChange: number;
};

export type IRevenueMonth = {
  month: string;
  revenue: number;
  bookings: number;
};

export type IDestinationData = {
  name: string;
  value: number;
  color: string;
};

export type IDashboardSummaryResponse = {
  stats: IDashboardStats;
  trend: IDashboardTrend;
  revenueData: IRevenueMonth[];
  destinationData: IDestinationData[];
  recentBookings: Array<{
    id: string;
    customer: string;
    destination: string;
    amount: number;
    status: string;
    date: string;
    guestCount: number;
  }>;
};

export const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query<IEarningsResponse, IEarningQueryParams>({
      query: (args: IEarningQueryParams = {}) => ({
        url: "/booking",
        method: "GET",
        params: {
          page: args.page ?? 1,
          limit: args.limit ?? 10,
          ...(args.search ? { search: args.search } : {}),
          ...(args.paymentStatus && args.paymentStatus !== "all"
            ? { paymentStatus: args.paymentStatus }
            : {}),
          ...(args.sort ? { sort: args.sort } : {}),
        },
      }),
      transformResponse: (response: IEarningsResponse) => response,
      providesTags: ["PAYMENT"],
    }),

    getEarningsDetails: builder.query<IDashboardSummaryResponse, void>({
      query: () => ({
        url: "/booking/dashboard-summary",
        method: "GET",
      }),
      transformResponse: (response: { data: IDashboardSummaryResponse }) => response.data,
      providesTags: ["PAYMENT"],
    }),
  }),
});

export const { useGetEarningsQuery, useGetEarningsDetailsQuery } = earningsApi;
