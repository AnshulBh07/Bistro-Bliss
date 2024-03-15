import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import styles from "../../sass/loginFormStyles.module.scss";
import { FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { ILoginState } from "../../services/helper-functions/interfaces";
import {
  validateEmail,
  validatePassword,
} from "../../services/helper-functions/formValidation";
import { setToast } from "../../services/helper-functions/setToast";
import { loginUser } from "../../services/helper-functions/loginFormRequests";
import { ButtonSpinner } from "../loader/ButtonSpinner";

export const LoginForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const loginState: ILoginState = useSelector(
    (state: RootState) => state.login
  );

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { email, password, remember } = loginState;
  // console.log(loginState);

  // const navigate = useNavigate();
  let timer: NodeJS.Timeout;
  const controller = new AbortController();

  const handleLoginFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    clearTimeout(timer);
    e.preventDefault();
    setIsLoading(true);

    dispatch({ type: "login/show" });
    localStorage.setItem(
      "login",
      JSON.stringify({ ...loginState, show: false })
    );

    // if any field is empty
    if (email == "" || password == "") {
      dispatch({ type: "toast/show" });
      dispatch({
        type: "toast/setInfo",
        payload: { status: "error", message: "All fields are mandatory." },
      });
      timer = setTimeout(() => {
        dispatch({ type: "toast/hide" });
      }, 4000);
    }

    // validate fields
    if (!validateEmail(email)) {
      setToast("error", "Invalid email.", dispatch, timer);
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setToast("error", "Invalid password.", dispatch, timer);
      setIsLoading(false);
      return;
    }

    // if everything is ok, proceed with request
    const response = await loginUser(loginState, controller.signal);

    if (response) {
      if (response.status === 500) {
        setToast("error", response.data, dispatch, timer);
        setIsLoading(false);
        return;
      }

      if (response.status === 404) {
        setToast("error", response.data, dispatch, timer);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);

      // else the request is successful, we get a jwt and we store the token in cookie/session storage
      // console.log(response.data);
      sessionStorage.setItem("tokens", JSON.stringify(response.data));

      // set persistent token in local storage for remember me functionality
      if (response.data.persistent_token)
        localStorage.setItem(
          "persistent_token",
          JSON.stringify(response.data.persistent_token)
        );

      // redirect to home page, set authenticated to true
      dispatch({ type: "login/authenticate" });
      navigate("/home");
    }
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    switch (name) {
      case "email":
        dispatch({ type: "login/email", payload: String(e.target.value) });
        break;
      case "password":
        dispatch({ type: "login/password", payload: String(e.target.value) });
        break;
      case "remember":
        dispatch({ type: "login/remember" });
        break;
    }
  };

  return (
    <div className={styles.form_wrapper}>
      <form action="post" className={styles.login_form}>
        <label htmlFor="email" className={styles.input_label}>
          <MdOutlineMailOutline className={styles.form_icon} />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="enter email address"
            value={email}
            onChange={handleFormInputChange}
          />
        </label>

        <label htmlFor="password" className={styles.input_label}>
          <MdLockOutline className={styles.form_icon} />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="enter password"
            value={password}
            onChange={handleFormInputChange}
          />
        </label>

        <div className={styles.options_wrapper}>
          <label htmlFor="remember" className={styles.remember_label}>
            <span>
              {remember && (
                <IoCheckbox
                  style={{
                    width: "130%",
                    height: "130%",
                    color: "#b33140",
                  }}
                />
              )}
            </span>
            <input
              type="checkbox"
              name="remember"
              id="remember"
              onChange={handleFormInputChange}
            />
            Remember me
          </label>

          <Link to={""}>Forgot password ?</Link>
        </div>

        <button
          type="submit"
          className={styles.login_btn}
          onClick={handleLoginFormSubmit}
        >
          {isLoading && <ButtonSpinner />}login
        </button>

        <div className={styles.signup}>
          <p>Don't have an account?</p>
          <button
            className={styles.enable_signup_btn}
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "signup/show" });
            }}
          >
            Sign up
          </button>
        </div>
      </form>

      {/* options for login using other means */}
      {/* separator */}
      <span className={styles.separator} />

      {/* sign in methods */}
      <div className={styles.methods_btn_wrapper}>
        <button
          className={styles.social_login_btn}
          onClick={() => window.open("https://www.facebook.com/", "_blank")}
        >
          <FaFacebookF className={styles.icon} style={{ color: "#316FF6" }} />
        </button>
        <button
          className={styles.social_login_btn}
          onClick={() =>
            window.open(
              "https://myaccount.google.com/?utm_source=sign_in_no_continue&pli=1",
              "_blank"
            )
          }
        >
          <FcGoogle className={styles.icon} style={{ color: "#db4a39" }} />
        </button>
        <button
          className={styles.social_login_btn}
          onClick={() => window.open("https://twitter.com/login", "_blank")}
        >
          <FaTwitter className={styles.icon} style={{ color: "#1D9BF0" }} />
        </button>
      </div>
    </div>
  );
};
