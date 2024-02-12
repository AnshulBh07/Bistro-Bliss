import React from "react";
import styles from "../../../sass/servicesStyles.module.scss";
import { servicesList } from "../../../services/data/servicesIteList";
import { ServiceCard } from "./ServiceCard";

export const Services: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>
        We also offer unique services for your events
      </h2>

      <div className={styles.services_wrapper}>
        {servicesList.map((item, index) => {
          return <ServiceCard key={index} item={item} />;
        })}
      </div>
    </section>
  );
};
