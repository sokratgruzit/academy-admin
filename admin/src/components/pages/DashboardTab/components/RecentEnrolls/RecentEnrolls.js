import React from "react";
import styles from "./RecentEnrolls.module.css";

const RecentEnrolls = ({ data }) => {
  return (
    <div className={styles.mainBox}>
      <div className={styles.box}>
        <h3 className={styles.title}>Recent Enrolls</h3>
        <div>
          <div className={styles.thead}>
            <span className={styles.head1}>COURSE TITLE</span>
            <span className={styles.head2}>INSTRUCTOR</span>
            <span className={styles.head3}>EMAIL ADDRESS</span>
            <span className={styles.head4}>RECENT ENROLLS</span>
          </div>
          {data.map((enroll, index) => {
            return (
              <div key={index} className={styles.trow}>
                <span className={styles.head1}>{enroll.title}</span>
                <span className={styles.head2}>{enroll.instuctor}</span>
                <span className={styles.head3}>{enroll.email}</span>
                <span className={styles.head4}>{enroll.price}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentEnrolls;
