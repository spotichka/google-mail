import { RouteObject } from "react-router-dom";
import EmailList from "../../componetns/email-list/EmailList.tsx";

const authRoutes: RouteObject[] = [
  {
    path: "/mail/:label",
    element: <EmailList />,
  },
];

export default authRoutes;
