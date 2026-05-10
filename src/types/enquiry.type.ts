export type IEnquiryStatus = "UNREAD" | "READ" | "REPLIED";

export interface IAdminEnquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  tourTitle?: string;
  tourSlug?: string;
  status: IEnquiryStatus;
  replyMessage?: string;
  repliedAt?: string;
  createdAt: string;
  updatedAt?: string;
}