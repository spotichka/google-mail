import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import RootLayout from "../componetns/root-layout/RootLayout.tsx";
import notAuthRoutes from "./no-auth-routes";
import authRoutes from "./auth-routes";
import Mail from "../pages/mail/mail.tsx";

const routes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute requireAuth={true}>
        <Mail />
      </ProtectedRoute>
    ),
    children: authRoutes,
  },
  {
    element: (
      <ProtectedRoute requireAuth={false}>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: notAuthRoutes,
  },
];

export default routes;
