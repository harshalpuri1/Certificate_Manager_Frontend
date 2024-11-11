import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import strings from "../utils/ForgotPassword.json";
import api from "../services/api";
import { toast } from "react-toastify";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); 
  const [step, setStep] = useState(1); // Track the step in the forgot password flow
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  // Validation for email format
  const formValidation = () => {
    const newErrors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email) {
      newErrors.email = `${strings.errorMail}`;
    } else if (!regex.test(email)) {
      newErrors.email = `${strings.errorFormat}`;
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle OTP Request Submission
  const handleOtpRequest = async (e) => {
    e.preventDefault();

    if (formValidation()) {
      const toastId = toast.loading(strings.sendingOtp);

      try {
        const body = {
          params: { email },
        };

        const response = await api.forgotPassword(body);

        if (response.status && response.body) {
          toast.update(toastId, {
            render: response.body.message,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setStep(2); // Move to the OTP verification step
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
          toast.error(error.message);
        }
      }
    }
  };

  // Handle OTP Verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(strings.sendingOtp);
    try {
      const body = { email, otp };
      const response = await api.verifyOtp(body);

      if (response.status && response.body) {
        toast.update(toastId, {
          render: response.body.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        nav(strings.signin);
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
        toast.update(toastId, {
          render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="login-signup-page">
      <div className="logo1">
        <img className="logo2" src="/assets/images/Group.png" alt="c-Gen" />
        <h1>{strings.cGen}</h1>
      </div>
      <div className="loginbox">
        <h3>{strings.forgotPassword}</h3>
        <h2>{strings.intro}</h2>

        {step === 1 && (
          <form onSubmit={handleOtpRequest}>
            <p>{strings.disc}</p>
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
            <button type="submit" className="btn">
              {strings.Submit}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpVerification}>
            <p>{strings.disc2}</p>

            <div className="formInput">
              <label htmlFor="otp">{strings.otp}</label>
              <input
                type="text"
                id="otp"
                placeholder={strings.enterOtp}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {errors.otp && <div className="error-message">{errors.otp}</div>}
            </div>
            <button type="submit" className="btn">
              {strings.verifyOtp}
            </button>
          </form>
        )}

        <div className="form-footer">
          <span onClick={() => nav(strings.signin)}>
            {strings["back-to-login"]} <span>{strings.Signin}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
