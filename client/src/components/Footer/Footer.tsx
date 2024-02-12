import React from "react";
import styles from "../../sass/footerStyles.module.scss";
import { social, navLinks, utilityLinks } from "../../services/data/links";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo2.png";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.top}>
        {/* social links and logo */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src={Logo} alt="logo-2" className={styles.logo2} />
            <p>bistro bliss</p>
          </div>

          <p className={styles.tagline}>
            The only thing we’re serious about is food.
          </p>

          {/* social media icons */}
          <div className={styles.icons}>
            {social.map((item, index) => {
              return (
                <button
                  className={styles.btn_icon}
                  key={index}
                  onClick={() => window.open(item.link)}
                >
                  {item.icon}
                </button>
              );
            })}
          </div>
        </div>

        {/* SPA links */}
        <div className={styles.links_wrapper}>
          <p className={styles.heading}>pages</p>

          <ul className={styles.links}>
            {navLinks.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.link}>{item.pathname}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* utility pages */}
        <div className={styles.links_wrapper}>
          <p className={styles.heading}>utility pages</p>

          <ul className={styles.links}>
            {utilityLinks.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.link}>{item.pathname}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* images */}
        <div className={styles.img_container}>
          <p>follow us on instagram</p>

          <div className={styles.img_grid}>
            <div>
              <img
                src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="footer pic"
                className={styles.footer_img}
              />
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="footer pic"
                className={styles.footer_img}
              />
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="footer pic"
                className={styles.footer_img}
              />
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="footer pic"
                className={styles.footer_img}
              />
            </div>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className={styles.bottom}>
        <hr className={styles.separator} />
        <p className={styles.copyright}>
          copyright <span>© anshul bhardwaj</span>, all rights reserved.
        </p>
      </div>
    </footer>
  );
};
