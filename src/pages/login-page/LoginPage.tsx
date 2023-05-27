import { userSlice } from "../../store/reducers/userSlice.ts";
import { useAppDispatch } from "../../hooks/redux.ts";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { fetchUser } from "../../store/AsyncActionCreators.ts";

const LoginPage = () => {
  const { setError } = userSlice.actions;

  const dispatch = useAppDispatch();
  const handleAuthSuccess = async (credentialResponse: TokenResponse) => {
    const { access_token } = credentialResponse;
    if (access_token) {
      localStorage.setItem("token", access_token);
      dispatch(fetchUser());
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
    <div>
      <button onClick={() => login()}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
