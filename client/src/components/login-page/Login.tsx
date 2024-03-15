/* STEPS TO CREATE A LOGIN FUNCTIONALITY
    1. Design user interface
    2. Collect user credentials (using state management)
    3. Handle form submission, using event handler preventing default action
    4. Send credentials to server using a post request
    5. Authenticate user, verify against user credentials in authentication database, generate a JWT or session ID for user
    6. Return authentication results to user, include JWT or session ID on successful authentication
    7. Handle the authentication result at client, store the result in localstorage or cookies
    8. handle successful login-card-container
    9. handle errors
    10. Make logout functionality, on successful logout invalidate JWT or session ID delete all cookies and clear local storage */
import React from "react";
import styles from "../../sass/loginStyles.module.scss";
import { Link } from "react-router-dom";
import { ILinks } from "../../services/helper-functions/interfaces";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { LoginForm } from "./LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SignupForm } from "./SignupForm";
import { Toast } from "../toasts/Toast";

export const Login: React.FC = () => {
  const { show } = useSelector((state: RootState) => state.signup);

  const redirectsArr: ILinks[] = [
    { text: "explore", link: "" },
    { text: "what", link: "" },
    { text: "help & feedback", link: "" },
    { text: "contact", link: "" },
  ];

  const socialArr: ILinks[] = [
    {
      icon: <RiFacebookBoxFill className={styles.social_icon} />,
      link: "https://www.facebook.com/",
      name: "facebook",
    },
    {
      icon: <FaTwitter className={styles.social_icon} />,
      link: "https://twitter.com/login",
      name: "twitter / X",
    },
    {
      icon: <TiSocialInstagram className={styles.social_icon} />,
      link: "https://www.instagram.com/?hl=en",
      name: "instagram",
    },
  ];

  return (
    <React.Fragment>
      <section className={styles.container__main}>
        {/* bg */}
        <div className={styles.bg_wrapper}>
          <img
            src="https://images.pexels.com/photos/349610/pexels-photo-349610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="food bg"
          />
        </div>

        <div className={styles.logo_wrapper}>
          <img
            src="https://i.pinimg.com/736x/7f/7e/f9/7f7ef93e691abaedb2607d24f79f846a.jpg"
            alt="logo"
          />
        </div>

        {/* form and footer */}
        <div className={styles.contents}>
          {/* header and form*/}
          <div className={styles.title_form_container}>
            <div className={styles.title}>
              <h1 className={styles.heading}>{!show ? "login" : "sign up"}</h1>
              {!show && (
                <p className={styles.text}>
                  more than <span>100 recipes</span> from around the world!!
                </p>
              )}
            </div>

            {!show ? <LoginForm /> : <SignupForm />}
          </div>

          {/* footer */}
          <div className={styles.footer}>
            <ul className={styles.redirects}>
              {redirectsArr.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.link} key={index}>
                      {item.text}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className={styles.social_wrapper}>
              <ul className={styles.social_media}>
                {socialArr.map((item, index) => {
                  return (
                    <li key={index}>
                      <button
                        className={styles.social_btn}
                        onClick={() => window.open(item.link, "_blank")}
                      >
                        <span>{item.name}</span>
                        {item.icon}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <p className={styles.copyright}>
                2024 Bistro Bliss, all rights and copyrights reserved
              </p>
            </div>
          </div>
        </div>
      </section>

      <Toast />
    </React.Fragment>
  );
};
