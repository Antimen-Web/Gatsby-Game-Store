import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "gatsby";
import {
  closeForm,
  openLoginForm,
  openRegisterForm,
} from "../redux/slices/authSlice";
import * as styles from "../css/AuthModal.module.css";
import MailIcon from "../icons/Mail.svg";
import Lock1 from "../icons/Lock1.svg";
import Lock2 from "../icons/Lock2.svg";
import PasswordInput from "./PasswordInput";
import { StaticImage } from "gatsby-plugin-image";

const AuthModal = () => {
  const dispatch = useDispatch();
  const activeForm = useSelector(state => state.auth.activeForm);

  // Email и пароли
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async e => {
    e.preventDefault();

    await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    dispatch(closeForm());
  };

  const handleRegister = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    dispatch(closeForm());
  };

  const handleCloseModal = useCallback(
    event => {
      if (event.target === event.currentTarget) {
        dispatch(closeForm());
      }
    },
    [dispatch]
  );

  const handleSwitchToRegister = useCallback(() => {
    dispatch(openRegisterForm());
  }, [dispatch]);

  const handleSwitchToLogin = useCallback(() => {
    dispatch(openLoginForm());
  }, [dispatch]);

  if (!activeForm) return null;

  const renderForm = () => {
    switch (activeForm) {
      case "login":
        return (
          <>
            <h3 className={styles.title}>Login</h3>
            <form
              method="POST"
              action="/login"
              onSubmit={handleLogin}
              className={styles.form}
            >
              <div className={styles.inputGroup}>
                <MailIcon stroke="#4F4F4F" className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="username"
                  required
                  className={styles.inputField}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <PasswordInput
                  Lock={Lock1}
                  login={true}
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                />
              </div>
              <button type="submit" className="btn auth">
                Login
              </button>
            </form>
            <div className={styles.switchFormText}>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleSwitchToRegister}
                className={styles.switchFormButton}
              >
                Register
              </button>
            </div>
          </>
        );
      case "register":
        return (
          <>
            <h3 className={styles.title}>Create an account</h3>
            <form
              method="POST"
              action="/signup"
              onSubmit={handleRegister}
              className={styles.form}
            >
              <div className={styles.inputGroup}>
                <MailIcon stroke="#4F4F4F" className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="username"
                  required
                  className={styles.inputField}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <PasswordInput
                  Lock={Lock1}
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                />
              </div>
              <div className={styles.inputGroup}>
                <PasswordInput
                  Lock={Lock2}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
              </div>
              <button type="submit" className="btn auth">
                Create account
              </button>
            </form>
            <div className={styles.switchFormText}>
              Already have an account?{" "}
              <button
                type="button"
                onClick={handleSwitchToLogin}
                className={styles.switchFormButton}
              >
                Login
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleCloseModal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.headerSpacer} />
          <Link to="/" className={styles.logoLink}>
            <StaticImage
              src="../images/logo.png"
              alt="logo"
              loading="eager"
              layout="constrained"
            />
          </Link>
          <button
            onClick={() => dispatch(closeForm())}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            ✖
          </button>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};

export default React.memo(AuthModal);
