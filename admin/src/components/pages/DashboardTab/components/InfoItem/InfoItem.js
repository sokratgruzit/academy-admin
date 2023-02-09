import React from "react";
import styles from "./InfoItem.module.css";

const InfoItem = ({ title, subTitle, data }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.subTitle}>{subTitle}</p>
        </div>
        <p>{data} </p>
      </div>
    </div>
  );
};

export default InfoItem;
