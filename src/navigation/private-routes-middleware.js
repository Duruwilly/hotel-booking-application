import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { AuthCheckAccess } from "../utils/AuthCheckAccess";

const PrivateRouteMiddleware = () => {
  const { loggedIn, checkingStatus } = AuthCheckAccess();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;

};

export default PrivateRouteMiddleware;
