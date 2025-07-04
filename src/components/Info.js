import React from "react";
import * as styles from "../css/Info.module.css";

const Info = ({ info }) => {
  return (
    <div className={styles.info}>
      <div className={styles.icon}>{info.icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{info.title}</div>
        <div className={styles.text}>
          {info.text.map(text => {
            return <p>{text.p}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Info;
