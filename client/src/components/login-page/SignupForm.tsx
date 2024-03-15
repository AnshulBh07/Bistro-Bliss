import React, { useState } from "react";
import styles from "../../sass/signupFormStyles.module.scss";
import { LuUser2 } from "react-icons/lu";
import { FaUserAstronaut } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../services/helper-functions/formValidation";
import {
  addUser,
  findUsername,
} from "../../services/helper-functions/signupFormRequests";
import { setToast } from "../../services/helper-functions/setToast";
import { ButtonSpinner } from "../loader/ButtonSpinner";

export const SignupForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const signupState = useSelector((state: RootState) => state.signup);
  const { terms, first_name, last_name, email, username, password } =
    signupState;

  // create a state to check whether both password fields match
  const [cpwd, setCpwd] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let timer: NodeJS.Timeout;

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearTimeout(timer);
    setIsLoading(true);

    // if any of the fields(except last_name) is empty
    if (
      first_name === "" ||
      email === "" ||
      username === "" ||
      password === ""
    ) {
      setToast("error", "All fields are mandatory!", dispatch, timer);
      setIsLoading(false);
      return;
    }

    if (!terms) {
      setToast("error", "Please accept terms and services.", dispatch, timer);
      setIsLoading(false);
      return;
    }

    // first we will handle form inputs validation
    if (!validateForm(signupState)[0]) {
      // console.log(validateForm(signupSate));
      setToast("warning", validateForm(signupState)[1], dispatch, timer);
      setIsLoading(false);
      return;
    }

    // if passwords do not match
    if (password !== cpwd) {
      setToast("error", "Passwords do not match!", dispatch, timer);
      setIsLoading(false);
      return;
    }

    // the username should be unique so we hit a request to server in order to check that
    const result = await findUsername(username);
    // console.log(status);

    if (result) {
      if (result === 409) {
        setToast("error", "Username already taken!", dispatch, timer);
        setIsLoading(false);
        return;
      }

      if (result === 500) {
        setToast("error", "Some error occurred at server...", dispatch, timer);
        setIsLoading(false);
        return;
      }

      // if status is ok (200), insert the new user in database and redirect to login page
      const response = await addUser(signupState);

      if (response) {
        if (response === 200) {
          setToast(
            "success",
            "Registration successful, redirecting to login page..",
            dispatch,
            timer
          );
          setIsLoading(false);

          timer = setTimeout(() => {
            dispatch({ type: "signup/show" });
          }, 3000);
        }

        if (response === 500) {
          setToast("error", "Internal server Error!", dispatch, timer);
          setIsLoading(false);
          return;
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    switch (name) {
      case "first_name":
        dispatch({ type: "signup/first_name", payload: e.target.value });
        break;
      case "last_name":
        dispatch({ type: "signup/last_name", payload: e.target.value });
        break;
      case "email":
        dispatch({ type: "signup/email", payload: e.target.value });
        break;
      case "pwd":
        dispatch({ type: "signup/password", payload: e.target.value });
        break;
      case "username":
        dispatch({ type: "signup/username", payload: e.target.value });
        break;
      case "confirm-pwd":
        setCpwd(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <form method="post" className={styles.form_wrapper}>
      {/* first name and last name */}
      <div className={styles.name}>
        <label htmlFor="first_name" className={styles.input_label}>
          <LuUser2 className={styles.form_icon} />
          <input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="enter first name"
            onChange={handleInputChange}
            value={first_name}
          />
        </label>
        <label htmlFor="last_name" className={styles.input_label}>
          <LuUser2 className={styles.form_icon} />
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="enter last name"
            onChange={handleInputChange}
            value={last_name}
          />
        </label>
      </div>
      {/* username */}
      <label htmlFor="username" className={styles.input_label}>
        <FaUserAstronaut className={styles.form_icon} />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="enter username"
          onChange={handleInputChange}
          value={username}
        />
      </label>
      {/* email id */}
      <label htmlFor="email" className={styles.input_label}>
        <MdOutlineMailOutline className={styles.form_icon} />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="enter email"
          onChange={handleInputChange}
          value={email}
        />
      </label>
      {/* password */}
      <label htmlFor="pwd" className={styles.input_label}>
        <MdLockOutline className={styles.form_icon} />
        <input
          type="password"
          name="pwd"
          id="pwd"
          placeholder="enter password"
          onChange={handleInputChange}
          value={password}
        />
      </label>
      {/* confirm password */}
      <label
        htmlFor="confirm-pwd"
        className={styles.input_label}
        style={cpwd !== password ? { border: "1px solid #b33140" } : {}}
      >
        <MdLockOutline className={styles.form_icon} />
        <input
          type="password"
          name="confirm-pwd"
          id="confirm-pwd"
          placeholder="retype password"
          onChange={handleInputChange}
          value={cpwd}
        />
      </label>

      {/* terms and services */}
      <label htmlFor="terms" className={styles.terms}>
        <span>
          {terms && (
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
          name="terms"
          id="terms"
          onChange={() => dispatch({ type: "signup/terms" })}
        />
        <p> I accept the Terms of Use and Privacy Policy.</p>
      </label>

      {/* button */}
      <button className={styles.signup_btn} onClick={handleFormSubmit}>
        {isLoading && <ButtonSpinner />}sign up
      </button>
    </form>
  );
};
