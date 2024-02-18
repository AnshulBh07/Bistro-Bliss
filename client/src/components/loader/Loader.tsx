import React from "react";
import styles from "../../sass/loaderStyles.module.scss";

export const Loader: React.FC = () => {
  return (
    <section className={styles.container}>
      <img
        src="https://i.pinimg.com/originals/dc/66/53/dc6653448a617b0564541708101d3eac.gif"
        alt="loader gif"
      />
    </section>
  );
};
