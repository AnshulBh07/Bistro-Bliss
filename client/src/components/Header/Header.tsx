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
import { verifyToken } from "../../services/helper-functions/loginFormRequests";
import { setToast } from "../../services/helper-functions/setToast";

const Header: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { showCartModal, cartData } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.login);

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

  const handleLogoutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // what we do when logout is clicked
    // 1. delete tokens from session storage
    // 2. set authenticated to false;
    dispatch({ type: "login/authenticate" });
    sessionStorage.removeItem("tokens");
  };

  let timer: NodeJS.Timeout;

  const handleLoginClick = async () => {
    // what we do when login is clicked
    // 1. first check for presence of persistent token, if it's there no need to redirect to /login and perform auto login after verifying from the server
    const persist_token = localStorage.getItem("persistent_token");

    if (persist_token !== null) {
      const token = JSON.parse(persist_token);
      // console.log(token);
      const response = await verifyToken(token);
      // console.log(response);

      if (response) {
        //error
        if (response.status === 401 || response.status === 500) {
          setToast("error", response.data, dispatch, timer);
          timer = setTimeout(() => navigate("/login"), 4000);
          return;
        }

        //success, store newly got access and refresh token in session storage
        sessionStorage.setItem("tokens", response.data);
        dispatch({ type: "login/authenticate" });
      }
    } else {
      //persistent token doesn't exist
      navigate("/login");
    }
  };

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
                    onClick={() => {
                      if (item.name === "Menu") {
                        const query = localStorage.getItem("query");
                        if (query) navigate(item.link + JSON.parse(query));
                      } else navigate(item.link);
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
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

          {isAuthenticated ? (
            <button className={styles.login_btn} onClick={handleLogoutClick}>
              logout
            </button>
          ) : (
            <button className={styles.login_btn} onClick={handleLoginClick}>
              login
            </button>
          )}

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
            <p>{cartData.length}</p>
          </button>
        </div>

        {/* modal, position is set to absolute and will only render when hover on cart bag or the modal itself*/}
        {showCartModal && <CartModal timeoutId={timeoutId!} />}
      </div>
    </header>
  );
};

export default Header;
