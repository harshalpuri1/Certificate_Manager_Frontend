import React, { useState } from "react";
import "./LoginPage.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import strings from "../utils/LoginPage.json";
import api from "../services/api";
import { toast } from "react-toastify";
import constants from "../utils/config/config";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const formValidation = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = strings.validUsername;
    }

    if (!password) {
      newErrors.password = strings.validPassword;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (formValidation()) {
      const toastId = toast.loading(strings.loginto);
      try {
        const body = {
          email: username,
          password: password,
        };
        const response = await api.loginUser(body);

        console.log(response);

        if (response.status && response.body) {
          localStorage.setItem(constants.localStorage.userEmail, username);
          localStorage.setItem(
            constants.localStorage.token,
            response.body.token
          );
          toast.update(toastId, {
            render: response.body.message,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          nav(constants.navigationLink.certificate);
        } else {
          throw new Error(strings.userNotExist);
        }
      } catch (error) {
        if (toast.isActive(toastId)) {
          toast.update(toastId, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.error(constants.constantsErrors.somethingWentWrong);
        }
      }
    }
  };

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="login-signup-page">
        <div className="logo1">
          <img className="logo2" src="/assets/images/Group.png" alt="c-Gen" />
          <h1>{strings.cGen}</h1>
        </div>
        <div className="loginbox">
          <h3>{strings.welcome}</h3>
          <h2>{strings.intro}</h2>
          <p>{strings.disc}</p>
          <form onSubmit={loginUser}>
            <div className="formInput">
              <label htmlFor={strings.username1}>{strings.username}</label>
              <input
                type="text"
                id={strings.username1}
                name={strings.username1}
                placeholder={strings.enterUsername}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <div className="error-message">{errors.username}</div>
              )}
            </div>
            <div className="formInput">
              <label htmlFor={strings.password}>{strings.password}</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id={strings.password}
                  name={strings.password}
                  placeholder={strings.enterPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={PasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>
            <div className="formLinks">
              <label>
                <input type="checkbox" name={strings.username1} />
                {strings.remember}
              </label>
              <span onClick={() => nav(strings.forgotpass)}>
                {strings.Forgot}
              </span>
            </div>
            <button type="submit" className="btn">
              {strings.Login}
            </button>
            <div className="form-footer">
              <p onClick={() => nav(strings.signup)}>
                {strings["not-account"]} <span>{strings.Register}</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
