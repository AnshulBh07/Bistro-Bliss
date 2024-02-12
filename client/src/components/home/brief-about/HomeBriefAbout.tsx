import React from "react";
import FoodImg from "../../../assets/images/julie-aagard.jpg";
import { ContactBlock } from "./ContactBlock";
import styles from "../../../sass/homeAboutUsStyles.module.scss";
import { useLocation } from "react-router-dom";

export const HomeBriefAbout: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // console.log(pathname);

  return (
    <section className={styles.container}>
      {/* contact details */}
      <div className={styles.img_container}>
        <img
          src={
            pathname.startsWith("/home") || pathname === ""
              ? FoodImg
              : "https://images.pexels.com/photos/3789885/pexels-photo-3789885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="food roll"
          className={styles.foodRoll}
        />

        <ContactBlock />
      </div>

      {/* info */}
      <div className={styles.info_container}>
        <h2 className={styles.heading}>
          We provide healthy food for your family.
        </h2>

        <p className={styles.para1}>
          Our story began with a vision to create a unique dining experience
          that merges fine dining, exceptional service, and a vibrant ambience.
          Tooted in city's rich culinary cuisine,we aim to honor our local roots
          while infusing a global palate
        </p>

        <p className={styles.para2}>
          At place we believe that dining is not just about food, but also about
          the overall experience. Our staff, renowned for their warmth and
          dedication, strives to make every visit an unforgettable experience
        </p>

        {/* button only visible on home screen */}
        {(pathname.startsWith("/home") || pathname === "") && (
          <button className={styles.moreBtn}>more about us</button>
        )}
      </div>
    </section>
  );
};
