import React from "react";
import styles from "../../../sass/heroStyles.module.scss";
import BgImage from "../../../assets/images/good-food.jpg";

export const Hero: React.FC = () => {
  return (
    <section className={styles.container}>
      <img src={BgImage} alt="good-food-bg" className={styles.bgImg} />

      <div className={styles.info}>
        <h1 className={styles.heading}>Best food for your taste</h1>
        <p className={styles.para}>
          Discover delectable cuisine and unforgettable moments in our welcoming
          culinary heaven.
        </p>

        <div className={styles.btnGroup}>
          <button className={styles.btnBook}>book a table</button>
          <button className={styles.btnExplore}>explore menu</button>
        </div>
      </div>
    </section>
  );
};
