import React from "react";
import styles from "../../sass/statsStyles.module.scss";

export const Stats: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <h2>A little information for our valuable guests</h2>
        <p>
          At place we believe that dining is not just about food,but also about
          the overall experience. Our staff, renowned for their warmth and
          dedication strives to make every visit an unforgettable one.
        </p>

        {/* stats */}
        <div className={styles.stat_grid}>
          <div className={styles.stat_card}>
            <h2 className={styles.value}>3</h2>
            <p className={styles.title}>locations</p>
          </div>

          <div className={styles.stat_card}>
            <h2 className={styles.value}>1995</h2>
            <p className={styles.title}>founded</p>
          </div>

          <div className={styles.stat_card}>
            <h2 className={styles.value}>65+</h2>
            <p className={styles.title}>staff members</p>
          </div>

          <div className={styles.stat_card}>
            <h2 className={styles.value}>100%</h2>
            <p className={styles.title}>satisfied customers</p>
          </div>
        </div>
      </div>

      <div className={styles.img_container}>
        <img
          src="https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg"
          alt="chef cooking"
        />
      </div>
    </section>
  );
};
