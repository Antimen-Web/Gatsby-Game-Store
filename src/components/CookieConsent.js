import React, { useEffect, useState } from "react";
import * as styles from "../css/CookieConsent.module.css";
import { Link } from "gatsby";

const CookieConsent = ({ onAccept, onDecline }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
    onDecline?.();
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.text}>
        <div className={styles.title}>
          We use cookies to improve your experience
        </div>
        <p>
          By using our site, you agree to our use of cookies. You can manage
          your preferences in the settings.
        </p>
      </div>
      <div className={styles.actions}>
        <button className={`btn ${styles.decline}`} onClick={handleAccept}>
          Decline All
        </button>
        <button className={`btn ${styles.accept}`} onClick={handleDecline}>
          Accept All
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
