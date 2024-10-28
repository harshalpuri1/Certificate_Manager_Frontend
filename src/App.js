import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignUp from "./Components/signUp/SignUp";
import Certificate from "./Components/certificate/CertificatePage";
import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import Settings from "./Components/settings/Settings";
import routes from "./Components/utils/App.json";
import ForgotPassword from "./Components/forgotPasspg/ForgotPassword";

function App() {
  return (
    <HashRouter>
      <AppRoutes />
      <Routes>
        <Route path={routes.signin} element={<LoginPage />} />
        <Route path={routes.signup} element={<SignUp />} />
        <Route path={routes.forgotpass} element={<ForgotPassword />} />
        <Route path={routes.certificate} element={<Certificate />} />
        <Route path={routes.settings} element={<Settings />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
