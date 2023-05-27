import { RouteObject } from "react-router-dom";
import LoginPage from "../../pages/login-page/LoginPage.tsx";

const notAuthRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
];

export default notAuthRoutes;
