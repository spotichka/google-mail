import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILabelsResponse } from "../types/ILabel.ts";
import { IMessageResponse } from "../types/MessageItem.ts";

export const mailAPI = createApi({
  reducerPath: "mailAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gmail.googleapis.com/gmail/v1/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
  tagTypes: ["messages"],
  endpoints: (build) => ({
    getLabels: build.query<ILabelsResponse, string | undefined>({
      query: (userId: string) => ({
        url: `users/${userId}/labels`,
      }),
    }),
    getMails: build.query<
      IEmailListResponse,
      { userId: string | undefined; label: string; nextPageToken?: string }
    >({
      query: ({ userId, label, nextPageToken }) => ({
        url: `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages`,
        params: {
          labelIds: label,
          maxResults: 50,
          pageToken: nextPageToken,
        },
      }),
    }),
    getMail: build.query<
      IMessageResponse,
      { userId: string | undefined; mailId: string }
    >({
      query: ({ userId, mailId }) => ({
        url: `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${mailId}`,
      }),
    }),
  }),
});
export const { useGetLabelsQuery, useGetMailsQuery, useGetMailQuery } = mailAPI;
