import React, { useState } from "react";
import Eye from "../icons/Eye.svg";
import EyeClosed from "../icons/Eye_closed.svg";
import * as styles from "../css/PasswordInput.module.css";

const PasswordInput = ({ Lock, login, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Lock stroke="#4F4F4F" />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete={login ? "current-password" : "new-password"}
        required
      />
      {showPassword ? (
        <EyeClosed
          stroke="#4F4F4F"
          className={styles.eye}
          onClick={() => setShowPassword(!showPassword)}
        />
      ) : (
        <Eye
          className={styles.eye}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </>
  );
};

export default PasswordInput;
