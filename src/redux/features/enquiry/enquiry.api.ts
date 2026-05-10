import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IAdminEnquiry } from "@/types/enquiry.type";

type CreateEnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  tourTitle?: string;
  tourSlug?: string;
};

type UpdateAdminEnquiryPayload = {
  enquiryId: string;
  payload: {
    status?: "UNREAD" | "READ" | "REPLIED";
    replyMessage?: string;
  };
};

export const enquiryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEnquiry: builder.mutation<IResponse<IAdminEnquiry>, CreateEnquiryPayload>({
      query: (payload) => ({
        url: "/enquiry",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["ENQUIRY"],
    }),
    getAdminEnquiries: builder.query<IResponse<IAdminEnquiry[]>, Record<string, string | number>>({
      query: (params) => ({
        url: "/enquiry/admin",
        method: "GET",
        params,
      }),
      providesTags: ["ENQUIRY"],
    }),
    updateAdminEnquiry: builder.mutation<IResponse<IAdminEnquiry>, UpdateAdminEnquiryPayload>({
      query: ({ enquiryId, payload }) => ({
        url: `/enquiry/admin/${enquiryId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["ENQUIRY"],
    }),
  }),
});

export const {
  useCreateEnquiryMutation,
  useGetAdminEnquiriesQuery,
  useUpdateAdminEnquiryMutation,
} = enquiryApi;