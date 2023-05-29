import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux.ts";
import * as React from "react";

const ProtectedRoute = ({
  children,
  requireAuth,
}: {
  children: React.ReactNode;
  requireAuth: boolean;
}) => {
  const { user } = useAppSelector((state) => state.userReducer);
  const location = useLocation();

  if (!requireAuth && user) {
    return <Navigate to={"/mail"} state={{ from: location }} replace />;
  }

  if (requireAuth && !user) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
