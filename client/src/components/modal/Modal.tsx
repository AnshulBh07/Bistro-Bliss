import React from "react";
import styles from "../../sass/modalStyles.module.scss";
import { FilterModal } from "./FilterModal";

export const Modal: React.FC = () => {
  return (
    <div className={styles.container}>
      <FilterModal />
    </div>
  );
};
