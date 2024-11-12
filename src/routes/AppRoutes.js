import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constants from "../Components/utils/config/config";

export const AppRoutes = () => {
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(constants.localStorage.token);
    if (token && location.pathname === constants.navigationLink.loginLink) {
      nav(constants.navigationLink.certificate);
    } else if (
      !token &&
      location.pathname === constants.navigationLink.certificate
    ) {
      nav(constants.navigationLink.loginLink);
    }
  }, [location.pathname, nav]);

  return null;
};
