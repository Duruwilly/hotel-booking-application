import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { useCheckAccess } from "../hooks/useCheckAccess";

const PrivateRouteMiddleware = () => {
  const { loggedIn, checkingStatus } = useCheckAccess();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteMiddleware;
