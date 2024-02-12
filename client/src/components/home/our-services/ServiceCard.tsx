import React from "react";
import { serviceItem } from "../../../services/data/servicesIteList";
import styles from "../../../sass/serviceCardStyles.module.scss";

interface IProps {
  item: serviceItem;
  key: number;
}

export const ServiceCard: React.FC<IProps> = ({ item }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <img src={item.img} alt="" className={styles.bg_img} />
      </div>

      <p className={styles.title}>{item.title}</p>
      <p className={styles.desc}>{item.description}</p>
    </div>
  );
};
