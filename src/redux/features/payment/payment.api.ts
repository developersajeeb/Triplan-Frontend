import { baseApi } from "@/redux/baseApi";

export type IGetMyPaymentsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
};

export interface IPaymentData {
  _id: string;
  transactionId: string;
  booking: {
    _id: string;
    tour: {
      _id?: string;
      title: string;
    };
    date: string;
    guestCount: number;
    batchNo?: string | number | null;
  };
  batchNo?: string | number | null;
  amount: number;
  status: "PAID" | "FAILED" | "CANCELLED" | "UNPAID" | "REFUNDED";
  createdAt: string;
  invoiceUrl?: string;
}

export interface IPaymentResponse {
  result: IPaymentData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyPayments: builder.query({
      query: (args: IGetMyPaymentsParams = {}) => ({
        url: "/payment/my-payments",
        method: "GET",
        params: {
          page: args.page ?? 1,
          limit: args.limit ?? 10,
          ...(args.search ? { search: args.search } : {}),
          ...(args.status ? { status: args.status } : {}),
          ...(args.startDate ? { startDate: args.startDate } : {}),
          ...(args.endDate ? { endDate: args.endDate } : {}),
        },
      }),
      transformResponse: (response: any) => {
        if (response && response.data) {
          return response.data;
        }
        return { result: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } };
      },
      providesTags: ["BOOKING"],
    }),

    getInvoiceUrl: builder.query({
      query: (paymentId: string) => ({
        url: `/payment/invoice/${paymentId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        if (response && response.data) {
          return response.data;
        }
        return null;
      },
    }),
  }),
});

export const { useGetMyPaymentsQuery, useGetInvoiceUrlQuery } = paymentApi;
