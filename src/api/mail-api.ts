import { createApi } from "@reduxjs/toolkit/query/react";
import { ILabelsResponse } from "../types/Label.ts";
import { IMessageResponse } from "../types/MessageItem.ts";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { userSlice } from "../store/reducers/userSlice.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://gmail.googleapis.com/gmail/v1/",
  prepareHeaders: (headers) => {
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(userSlice.actions.removeUser());
  }
  return result;
};

export const mailAPI = createApi({
  reducerPath: "mailAPI",
  baseQuery: baseQueryWithReauth,
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
