import React, { useEffect } from "react";
import styles from "../../sass/menuItemModalStyles.module.scss";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { formatToCurrency } from "../../services/helper-functions/formatCurrency";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { isPresentInCart } from "../../services/helper-functions/cartPresenceCheck";

export const MenuItemModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const menuState = useSelector((state: RootState) => state.menuItem);
  const { menuData } = menuState;

  const cartState = useSelector((state: RootState) => state.cart);
  const { cartData } = cartState;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  return (
    <div className={styles.container}>
      {/* close button */}
      <button
        className={styles.close_btn}
        onClick={() =>
          dispatch({ type: "menuItemModal/show", payload: menuData })
        }
      >
        <AiOutlineClose className={styles.icon} />
      </button>

      <div className={styles.img_container}>
        <img src={menuData.image} alt="food image" />
      </div>

      <div className={styles.info_wrapper}>
        {/* basic info */}
        <div className={styles.info}>
          <img
            src={
              menuData.veg
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/1200px-Indian-vegetarian-mark.svg.png"
                : "https://www.pngkey.com/png/detail/245-2459071_non-veg-icon-non-veg-symbol-png.png"
            }
            alt="veg or non-veg"
            className={styles.veg_logo}
          />
          <p className={styles.name}>{menuData.title}</p>
          <p className={styles.price}>
            <FaIndianRupeeSign className={styles.rupee_icon} />
            {formatToCurrency(menuData.price!)}
          </p>
        </div>

        {/* button */}
        {/* only show add button if current item is not present in cart */}
        {!isPresentInCart(cartData, menuData._id!) ? (
          <button
            className={styles.add_btn}
            onClick={() =>
              dispatch({
                type: "cart/add",
                payload: { ...menuData, quantity: 1 },
              })
            }
          >
            Add
          </button>
        ) : (
          <div className={styles.qty_bar}>
            <button
              className={styles.qtyDec_btn}
              onClick={() => {
                dispatch({
                  type: "cart/decQty",
                  payload: { ...menuData, quantity: -1 },
                });
              }}
              disabled={
                // notice that here -1 will never be returned as the particular item has to be
                // in cart for this component to render in the first place
                cartData[
                  cartData.findIndex((item) => {
                    return item._id === menuData._id;
                  })
                ].quantity <= 1
              }
            >
              <FaMinus className={styles.minus_icon} />
            </button>
            <p>
              {
                cartData[
                  cartData.findIndex((item) => {
                    return item._id === menuData._id;
                  })
                ].quantity
              }
            </p>
            <button
              className={styles.qtyInc_btn}
              onClick={() =>
                dispatch({
                  type: "cart/incQty",
                  payload: { ...menuData, quantity: -1 },
                })
              }
            >
              <FaPlus className={styles.plus_icon} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
