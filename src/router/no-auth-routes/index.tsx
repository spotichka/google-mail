import { RouteObject } from "react-router-dom";
import App from "../../App.tsx";

const notAuthRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
];

export default notAuthRoutes;
