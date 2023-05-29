import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { fetchUser } from "../../store/AsyncActionCreators.ts";
import { useGoogleLogin } from "@react-oauth/google";
import Loader from "../loader/Loader.tsx";
import { userSlice } from "../../store/reducers/userSlice.ts";
import * as React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.userReducer);
  const token = localStorage.getItem("token");

  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      localStorage.setItem("token", access_token);
      dispatch(fetchUser());
    },
    onError: () => dispatch(userSlice.actions.setError),
    scope: "https://mail.google.com/",
  });

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
    } else {
      dispatch(userSlice.actions.setIsLoading(false));
    }
  }, []);
  useEffect(() => {
    if (error === "Auth error") {
      localStorage.removeItem("token");
      login();
    }
  }, [error]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
