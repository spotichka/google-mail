import { useAppDispatch } from "../../hooks/redux.ts";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { fetchUser } from "../../store/AsyncActionCreators.ts";
import { userSlice } from "../../store/reducers/userSlice.ts";
import { Typography } from "antd";
import s from "./styles.module.css";

const { Title, Text } = Typography;

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
    <div className={s.wrapper}>
      <Title level={3}>Welcome</Title>
      <Text>Please login with your google account</Text>
      <div className={s.googleBtn} onClick={() => login()}>
        <div className={s.googleIconWrapper}>
          <img
            className={s.googleIcon}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt={"google_logo"}
          />
        </div>
        <p className={s.btnText}>
          <b>Sign in with google</b>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
