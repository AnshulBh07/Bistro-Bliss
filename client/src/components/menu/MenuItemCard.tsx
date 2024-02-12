import React from "react";
import styles from "../../sass/menuItemCardStyles.module.scss";
import { calculateStars } from "../../services/helper-functions/calculateRating";
import { formatToCurrency } from "../../services/helper-functions/formatCurrency";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { IoStarHalfOutline } from "react-icons/io5";

export const MenuItemCard: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img_wrapper}>
        <img
          src="https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="pasta"
        />
      </div>

      <div className={styles.info}>
        <div className={styles.rating}>
          {calculateStars(4.5).map((item, index) => {
            if (item === 1)
              return <IoStar className={styles.icon} key={index} />;

            return <IoStarHalfOutline className={styles.icon} key={index} />;
          })}
        </div>
        <p className={styles.price}>
          <FaIndianRupeeSign className={styles.rupee} />
          {formatToCurrency(78651)}
        </p>
        <p className={styles.title}>white sauce pasta</p>
        <p className={styles.intro}>Made of milk ,butter and flour</p>
      </div>
    </div>
  );
};
