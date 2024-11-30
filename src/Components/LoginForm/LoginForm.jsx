import React from 'react'
import "./LoginForm.css";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import {validateEmail,validatePassword} from "../utils/LoginValidation"



export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  const emailErrorMsg = validateEmail(email);
  setEmailError(emailErrorMsg);

  const passwordErrorMsg = validatePassword(password);
  setPasswordError(passwordErrorMsg);

    try {
      const response = await axios.post('http://localhost:3000/app/trading/login', {
        email,
        password,
        recaptchaValue,
      });

      if (response.data.message === "Login SuccessFul") {
        sessionStorage.setItem('userEmail', email);
        navigate1(1);
      }

    } catch (error) {
      alert('Login Unsuccessful');
      console.error('Login Unsuccessful');
    }
  }

  //Handle Dashboard Navigation
  function navigate1(data) {
    if (data === 1) {
      alert('Success');
      window.location.href = '/Dashboard';
      console.log('Login Success:', data);
    }
  }

  // Handle reCAPTCHA response
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <div className="full">
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='input-box'>
            <input type='text' 
            placeholder='Email' 
            required value={email} 
            onChange={(e) => setEmail(e.target.value)} />
            <FaUserAlt className='icon' />
            {emailError && <div className="error">{emailError}</div>}
          </div>

          <div className='input-box'>
            <input type='text' 
            placeholder='Password' 
            required value={password} 
            onChange={(e) => setPassword(e.target.value)} />
            <FaLock className='icon' />
            {passwordError && <div className="error">{passwordError}</div>}
          </div>

          <div className="remember-forgot1">
            <a href="/Register">Forgot password</a>
          </div>

          <ReCAPTCHA
            class="g-recaptcha"
            sitekey="6LdiE1kqAAAAACTMNH-v4Ahdhxe_hrcadVML2bFb"
            onChange={handleRecaptchaChange}
          />

          <button type='submit'>Login</button>

          <div className="register-link1">
            <p>Don't have an account ?<a href="/Register">Register</a></p>
          </div>
        </form>
      </div>
    </div>

  );
};
