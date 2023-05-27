import { useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const MainPage = () => {
  const [token, setUserToken] = useState("");
  const [userId, setUserId] = useState("");
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      setUserToken(tokenResponse.access_token);
    },
    scope: "https://mail.google.com/",
  });

  const getUserInfo = async () => {
    try {
      const res = await axios("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserId(res.data.id);
    } catch (e) {}
  };

  const getUserFolders = async () => {
    try {
      const res = await axios(
        `https://gmail.googleapis.com/gmail/v1/users/${userId}/labels`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (e) {}
  };

  const getUserMessages = async () => {
    try {
      const res = await axios(
        `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages?maxResults=10&labelIds=INBOX`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
    } catch (e) {}
  };

  const handleRefreshToken = async () => {
    try {
      const res = await axios("https://www.googleapis.com/oauth2/v4/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {}
  };

  return (
    <div>
      vite app <button onClick={() => login()}>Login</button>{" "}
      <button onClick={getUserInfo}>Get info</button>
      <button onClick={getUserFolders}>Get mail</button>
      <button onClick={getUserMessages}>Get messages</button>
      <button onClick={handleRefreshToken}>Get tokens</button>
    </div>
  );
};

export default MainPage;
