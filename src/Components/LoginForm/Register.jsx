import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Register.css";
import axios from "axios";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { validateFirstName, validateLastName, validateEmail, validatePassword, validateConfirmPassword, } from "../utils/RegisterValidation"


export default function Register() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");


  const PostData = (e) => {
    e.preventDefault();

    const firstNameErrorMsg = validateFirstName(firstName);
    setFirstNameError(firstNameErrorMsg);

    const lastNameErrorMsg = validateLastName(lastName);
    setLastNameError(lastNameErrorMsg);

    const emailErrorMsg = validateEmail(email);
    setEmailError(emailErrorMsg);

    const passwordErrorMsg = validatePassword(password);
    setPasswordError(passwordErrorMsg);

    const confirmPasswordErrorMsg = validateConfirmPassword(password, confirmPassword);
    setConfirmPasswordError(confirmPasswordErrorMsg);

    // If there are errors, do not proceed
    if (firstNameErrorMsg || lastNameErrorMsg || emailErrorMsg || passwordErrorMsg || confirmPasswordErrorMsg) {
      return;
    }


    // Proceed with the Axios request if validation passes
    axios
      .post("http://localhost:3000/app/trading/register", {
        user_fname: firstName,
        user_lname: lastName,
        user_email: email,
        user_password: password,
        confirmPassword,
        recaptchaValue
      })
      .then((response) => {
        console.log("Posting Data", response);
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.error || error?.response?.data?.message || "An unexpected error occurred.";

        alert(errorMessage);
        


      })
  };

  // Handle reCAPTCHA response
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <div className="full">
      <div className="wrapper1">
        <form action="">
          <h1>Register</h1>
          <hr></hr>

          <div className="input-box">
            <input
              type="text"
              placeholder="frist name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FaUser className="icon" />
            {firstNameError && <div className="error-message">{firstNameError}</div>}
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <FaUser className="icon" />
            {lastNameError && <div className="error-message">{lastNameError}</div>}
          </div>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdEmail className="icon" />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder=" password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder=" Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FaLock className="icon" />
            {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
          </div>

          <ReCAPTCHA
            class="g-recaptcha"
            sitekey="6LdiE1kqAAAAACTMNH-v4Ahdhxe_hrcadVML2bFb"
            onChange={handleRecaptchaChange}
          />

          <button type="submit" onClick={PostData}>
            Register
          </button>

          <div className="register-linkMy">
            <p>
              Already Have An Account? <div><a href="/">log in</a></div>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
