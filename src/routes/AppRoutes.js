import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constants from "../Components/utils/config/config";

export const AppRoutes = () => {
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(constants.localStorage.token);
    const loginpg = location.pathname === constants.navigationLink.loginLink;
    const signup = location.pathname === constants.navigationLink.signup;
    const forgotpass = location.pathname === constants.navigationLink.forgotpass;
    const certificate = location.pathname === constants.navigationLink.certificate;
    const settings = location.pathname === constants.navigationLink.settings;
    if (token && (loginpg || signup || forgotpass)) {
      nav(constants.navigationLink.certificate);
    } else if (
      !token && (certificate || settings)
    ) {
      nav(constants.navigationLink.loginLink);
    }
  }, [location.pathname, nav]);

  return null;
};
