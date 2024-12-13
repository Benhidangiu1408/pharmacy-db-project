import React, { useState } from "react";
import "./signin.css";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSigninEmployee } from "../hooks/useSigninEmployee";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();

  const validate = useSigninEmployee();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = validate.mutate({
      account: email,
      password: password,
    });

    if (response.id) {
      // login(user);
      navigate("/homepage");
    } else {
      setErrorMessage("Tài khoản hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="login-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <IoArrowBackCircle />
      </button>
      <div className="login-container">
        <div className="login-box">
          <h2>ĐĂNG NHẬP</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Tài khoản"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Mật khẩu"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              ></button>
            </div>
            <button className="login-button" type="submit">
              ĐĂNG NHẬP
            </button>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </form>
        </div>
        <div className="logo-section">
          <img
            src="https://pakdd.org/archive/pakdd2015/images/543px-Logo-hcmut.svg.png"
            alt="BK Logo"
            className="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
