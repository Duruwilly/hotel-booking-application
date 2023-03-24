import axios from "axios";
import React, { lazy, useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import { WILL_TRIP_BASE_URL } from "../constants/base-urls";
import { useAuthContext } from "../context/AuthContext";
const UnauthorizedPage = lazy(() => import("../pages/UnauthorizePage"));

const CheckAccessRoute = ({ role, component: Component }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await axios.get(
          `${WILL_TRIP_BASE_URL}/checkAccess/${role}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        if (response.data.isAuthorize) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        setHasAccess(false);
      }

      setCheckingAccess(false);
    };

    checkAccess();
  }, [role, user?.token]);

  if (checkingAccess) {
    return <Spinner />;
  }

  if (hasAccess) {
    return <Component />;
  }

  return <UnauthorizedPage />;

  // const ReturnedComponent = useMemo(() => {
  //   let result;

  //   if (checkingAccess) {
  //     result = <SearchButtonSpinner />;
  //   } else {
  //     if (hasAccess) {
  //       result = expectedComponent;
  //     } else {
  //       result = UnauthorizedPage;
  //     }
  //   }

  //   return result;
  // }, [hasAccess, checkingAccess, expectedComponent]);
  // return <ReturnedComponent role={role} />;
};

export default CheckAccessRoute;
