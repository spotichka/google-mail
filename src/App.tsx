import { TokenResponse, useGoogleLogin } from "@react-oauth/google";

import { useAppDispatch } from "./hooks/redux.ts";
import { userSlice } from "./store/reducers/userSlice.ts";
import axios, { AxiosResponse } from "axios";

function App() {
  const { setUser, setError } = userSlice.actions;

  const dispatch = useAppDispatch();
  const handleAuthSuccess = async (credentialResponse: TokenResponse) => {
    const { access_token } = credentialResponse;

    if (access_token) {
      localStorage.setItem("token", access_token);
      try {
        const {
          data,
        }: AxiosResponse<{
          email: string;
          sub: string;
          picture?: string;
        }> = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        dispatch(
          setUser({
            id: data.sub,
            email: data.email,
            picture: data.picture,
          })
        );
      } catch (e) {}
    }
  };

  const handleAuthError = () => {
    dispatch(setError("En error occurred"));
  };

  const login = useGoogleLogin({
    onSuccess: handleAuthSuccess,
    onError: handleAuthError,
    scope: "https://mail.google.com/",
  });

  return (
    <>
      <button onClick={() => login()}>Login</button>
    </>
  );
}

export default App;
