import axios, { AxiosResponse } from "axios";
import { AppDispatch } from "../types/store_types.ts";
import { userSlice } from "./reducers/userSlice.ts";

export const fetchUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userIsFetching());

    const {
      data,
    }: AxiosResponse<{
      email: string;
      sub: string;
      picture?: string;
    }> = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    dispatch(
      userSlice.actions.setUser({
        id: data.sub,
        email: data.email,
        picture: data.picture,
      })
    );
  } catch (e: any) {
    if (e?.response?.status === 401) {
      dispatch(userSlice.actions.setError("Auth error"));
      return;
    }
    dispatch(userSlice.actions.setError("Something went wrong"));
  }
};
