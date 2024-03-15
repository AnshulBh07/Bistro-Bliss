import React from "react";
import styles from "../../sass/buttonSpinnerStyles.module.scss";

export const ButtonSpinner: React.FC = () => {
  return (
    <div className={styles.circle_base}>
      <div className={styles.arc}></div>
      <div className={styles.circle_top}></div>
    </div>
  );
};
