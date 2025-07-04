import React from "react";
import * as styles from "../css/InfoList.module.css";
import Info from "./Info";

const InfoList = ({ info_list }) => {
  return (
    <div className={`${styles.wrapper} container`}>
      <div className={styles.info_list}>
        {info_list.map((info, index) => {
          return <Info info={info} key={index} />;
        })}
      </div>
    </div>
  );
};

export default InfoList;
