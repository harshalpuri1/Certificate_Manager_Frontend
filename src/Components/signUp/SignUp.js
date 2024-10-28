import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import strings from "../utils/SignUp.json";
import api from "../services/api";
import { toast } from "react-toastify";
import constants from "../utils/config/config";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const nav = useNavigate();

  const formValidation = () => {
    const newErrors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email) {
      newErrors.email = `${strings.errorMail}`;
    } else if (!regex.test(email)) {
      newErrors.email = `${strings.errorFormat}`;
    }

    if (!password) {
      newErrors.password = `${strings.errorPassword}`;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = `${strings.errorCnfrmpassword}`;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = `${strings.errorNotMatched}`;
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValidation()) {
      try {
        const body = {
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        };
        const response = await api.registerUser(body);

        if (response.status && response.body) {
          toast.success(response.body.message, {
            toastId: constants.constantsErrors.toastId,
          });
          nav(constants.navigationLink.loginLink);
        }
      } catch (error) {
        toast.error(constants.constantsErrors.somethingWentWrong, {
          toastId: constants.constantsErrors.toastId,
        });
      }
    }
  };

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const confirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label htmlFor={strings.email1}>{strings.email}</label>
              <input
                type="text"
                id={strings.email1}
                name={strings.email1}
                placeholder={strings.enterEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
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
            <div className="formInput">
              <label htmlFor={strings.password1}>{strings.password1}</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "Password"}
                  id={strings.confirmPassword}
                  name={strings.confirmPassword}
                  placeholder={strings.entercnfrmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span onClick={confirmPasswordVisibility}>
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.confirmPassword && (
                <div className="error-message">{errors.confirmPassword}</div>
              )}
            </div>
            <button type="submit" className="btn">
              {strings.Submit}
            </button>
            <div className="form-footer">
              <p onClick={() => nav(strings.signin)}>
                {strings["not-account"]} <span>{strings.Signin}</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
