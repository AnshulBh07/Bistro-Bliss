import React from "react";
import styles from "../../sass/cartModalStyles.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CartModalItemTile } from "./CartModalItemTile";
import { formatToCurrency } from "../../services/helper-functions/formatCurrency";

interface IProps {
  timeoutId: NodeJS.Timeout;
}

export const CartModal: React.FC<IProps> = ({ timeoutId }) => {
  const dispatch: AppDispatch = useDispatch();
  const { cartData, cartTotal } = useSelector((state: RootState) => state.cart);
  console.log(cartData);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    dispatch({ type: "cart/show" });
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      dispatch({ type: "cart/hide" });
    }, 400);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className={styles.heading}>your food cart</p>
      <div className={styles.tiles_wrapper}>
        {cartData.map((item, index) => {
          return <CartModalItemTile key={index} data={item} />;
        })}
      </div>

      <div className={styles.button_wrapper}>
        <p>
          subtotal{" "}
          <span>
            <FaIndianRupeeSign />
            {formatToCurrency(cartTotal)}
          </span>
        </p>
        <button className={styles.checkout_btn}>checkout</button>
      </div>
    </div>
  );
};
