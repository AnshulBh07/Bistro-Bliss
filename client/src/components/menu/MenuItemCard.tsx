import React from "react";
import styles from "../../sass/menuItemCardStyles.module.scss";
import { calculateStars } from "../../services/helper-functions/calculateRating";
import { formatToCurrency } from "../../services/helper-functions/formatCurrency";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { IoStarHalfOutline } from "react-icons/io5";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { IMenuItem } from "../../services/helper-functions/interfaces";

interface IProps {
  itemData: IMenuItem;
  key: number;
}

export const MenuItemCard: React.FC<IProps> = ({ itemData }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleCardClick = () => {
    dispatch({ type: "menuItemModal/show", payload: itemData });
  };

  return (
    <div className={styles.container} onClick={handleCardClick}>
      <div className={styles.img_wrapper}>
        <img src={itemData.image} alt={itemData.title} />
      </div>

      <div className={styles.info}>
        <div className={styles.rating}>
          {calculateStars(itemData.rating).map((item, index) => {
            if (item === 1)
              return <IoStar className={styles.icon} key={index} />;

            return <IoStarHalfOutline className={styles.icon} key={index} />;
          })}
        </div>
        <p className={styles.price}>
          <FaIndianRupeeSign className={styles.rupee} />
          {formatToCurrency(itemData.price)}
        </p>
        <p className={styles.title}>{itemData.title}</p>
        <p className={styles.intro}>{itemData.description}</p>
      </div>
    </div>
  );
};
