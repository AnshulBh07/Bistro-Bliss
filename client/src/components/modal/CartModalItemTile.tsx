import React from "react";
import styles from "../../sass/cartModalTileStyles.module.scss";
import { ICartItem } from "../../services/helper-functions/interfaces";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { formatToCurrency } from "../../services/helper-functions/formatCurrency";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

interface IProps {
  data: ICartItem;
  key: number;
}

export const CartModalItemTile: React.FC<IProps> = ({ data }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className={styles.container}>
      {/* custom quantity bar */}

      <div className={styles.qty_bar}>
        <button
          className={styles.incQty_btn}
          onClick={() => dispatch({ type: "cart/incQty", payload: data })}
        >
          <FaPlus className={styles.plus_icon} />
        </button>
        <p>{data.quantity}</p>
        <button
          className={styles.decQty_btn}
          onClick={() => dispatch({ type: "cart/decQty", payload: data })}
          disabled={data.quantity <= 1}
        >
          <FaMinus className={styles.minus_icon} />
        </button>
      </div>

      {/* image wrapper */}
      <div className={styles.img_wrapper}>
        <img src={data.image} alt={data.title} />
      </div>

      {/* info wrapper */}
      <div className={styles.info_wrapper}>
        <p className={styles.title}>{data.title}</p>
        <img
          src={
            data.veg
              ? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/1200px-Indian-vegetarian-mark.svg.png"
              : "https://www.pngkey.com/png/detail/245-2459071_non-veg-icon-non-veg-symbol-png.png"
          }
          alt={data.title}
        />
        <p className={styles.price}>
          <FaIndianRupeeSign className={styles.rupee_icon} />{" "}
          {formatToCurrency(data.price)}
        </p>
      </div>

      {/* remove from cart button */}
      <button
        className={styles.remove_btn}
        onClick={() => dispatch({ type: "cart/delete", payload: data })}
      >
        <IoClose className={styles.remove_icon} />
      </button>
    </div>
  );
};
