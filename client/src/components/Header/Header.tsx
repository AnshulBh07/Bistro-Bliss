import React, { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import styles from "../../sass/headerStyles.module.scss";
import Logo from "../../assets/images/logo.png";
import { navItems } from "../../services/data/navItemsList";
import { NavigateFunction, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { CartModal } from "../modal/CartModal";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";

const Header: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { showCartModal } = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();

  // here we will use a useEffect which contains an intersection observer that observes Topbar,
  // when top bar goes out of view the navbar will become sticky (position fixed)
  // a state that stores visibility of top bar, initially true
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  // a ref that holds top bar
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // loop over all entries
      entries.forEach((entry) => {
        // if the component is out of view
        if (!entry.isIntersecting) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      });
    });

    // observes top bar
    observer.observe(barRef.current!);

    // cleanup function
    return () => observer.disconnect();
  }, [isVisible]);

  // console.log(isVisible);

  return (
    <header className={styles.container}>
      {/* top bar */}
      <TopBar barRef={barRef} />

      {/* navbar and logo */}
      <div
        className={styles.header_container}
        style={
          isVisible
            ? {
                position: "relative",
                opacity: pathname.includes("/home") ? "0.9" : "1",
                boxShadow: "none",
              }
            : {
                position: "fixed",
                opacity: "1",
                boxShadow: "0 5px 20px #c9c9c9",
              }
        }
      >
        <div className={styles.container_logo}>
          <img src={Logo} alt="logo" className={styles.logo} />
          <h2>bistro bliss</h2>
        </div>

        <nav className={styles.navbar}>
          <ul className={styles.navList}>
            {navItems.map((item, index) => {
              return (
                <li key={index} className={styles.navItem}>
                  <button
                    onClick={() => navigate(item.link)}
                    className={styles.navBtn}
                    // add a new style for current path, which can be derived using useLocation
                    style={{
                      backgroundColor: pathname.startsWith(item.link)
                        ? "#d2d9be"
                        : "",
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* book table button */}
        <div className={styles.cart_book_btn_group}>
          <button onClick={() => navigate("/book")} className={styles.bookBtn}>
            book a table
          </button>

          <button
            className={styles.cart_btn}
            onMouseEnter={() => dispatch({ type: "cart/show" })}
            onMouseLeave={() => {
              const id = setTimeout(() => {
                dispatch({ type: "cart/hide" });
              }, 400);

              setTimeoutId(id);
            }}
          >
            <GiShoppingBag className={styles.icon} />
            <p>1</p>
          </button>
        </div>

        {/* modal, position is set to absolute and will only render when hover on cart bag or the modal itself*/}
        {showCartModal && <CartModal timeoutId={timeoutId!} />}
      </div>
    </header>
  );
};

export default Header;
