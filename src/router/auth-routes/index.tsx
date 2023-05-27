import { RouteObject } from "react-router-dom";
import EmailList from "../../componetns/email-list/EmailList.tsx";
import Mail from "../../pages/mail/mail.tsx";

const authRoutes: RouteObject[] = [
  {
    path: "/mail",
    element: <Mail />,
  },
  {
    path: "/mail/:label",
    element: <EmailList />,
  },
];

export default authRoutes;
