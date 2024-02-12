import React from "react";
import FoodImg from "../../../assets/images/food1.jpg";
import Fruits from "../../../assets/images/fruits.jpg";
import Chef from "../../../assets/images/chef.jpg";
import styles from "../../../sass/homeDeliveryStyles.module.scss";
import { FaRegClock } from "react-icons/fa";
import { PiFlagBannerBold } from "react-icons/pi";
import { HiOutlineShoppingCart } from "react-icons/hi";

export const HomeDelivery: React.FC = () => {
  return (
    <section className={styles.container}>
      {/* images container */}
      <div className={styles.img_container}>
        <img src={Chef} alt="chef cooking" className={styles.chef} />

        <div className={styles.img_cont2}>
          <img src={FoodImg} alt="food in pan" className={styles.pan} />
          <img src={Fruits} alt="fruits in a bowl" className={styles.fruits} />
        </div>
      </div>

      {/* information */}
      <div className={styles.info}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Fasted Food Delivery in City</h2>
          <p className={styles.intro}>
            Get your food, at your doorsteps within 30 minutes
          </p>
        </div>

        <div className={styles.features}>
          <p>
            <FaRegClock className={styles.icon} /> Delivery within 30 minutes.
          </p>
          <p>
            <PiFlagBannerBold className={styles.icon} /> Best Offers and Prices.
          </p>
          <p>
            <HiOutlineShoppingCart className={styles.icon} /> Online Services
            Available
          </p>
        </div>
      </div>
    </section>
  );
};
