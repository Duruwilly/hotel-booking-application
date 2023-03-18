import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";

export const useCheckAccess = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);
  const { user } = useAuthContext();

  useEffect(() => {
    if (isMounted) {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return { loggedIn, checkingStatus };
};
