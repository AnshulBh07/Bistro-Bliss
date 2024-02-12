import React from "react";
import styles from "../../sass/featureCardStyles.module.scss";
import { featureItem } from "../../services/data/featuresList";

interface IProp {
  data: featureItem;
  key: number;
}

export const FeatureCard: React.FC<IProp> = ({ data }: IProp) => {
  return (
    <div className={styles.container}>
      <img src={data.image_link} alt="feature icon" />

      <div className={styles.info}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.desc}>{data.description}</p>
      </div>
    </div>
  );
};
