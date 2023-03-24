import axios from "axios";
import { WILL_TRIP_BASE_URL } from "../constants/base-urls";
import { useAuthContext } from "../context/AuthContext";

export const CheckAccessUtil = () => {
  const { user } = useAuthContext();
  const checkAccess = async (role) => {
    const response = await axios.get(
      `${WILL_TRIP_BASE_URL}/api/checkAccess/${role}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (response.status === "success") {
      // const data = await response.json();
      // const isAuthorized = data.isAuthorized;

      // Return true if the user is authorized to access the route, false otherwise
      if (response.data) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  };

  return {
    checkAccess,
  };
};

export default CheckAccessUtil;
