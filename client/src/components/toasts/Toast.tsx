import React from "react";
import styles from "../../sass/toastStyles.module.scss";
import { GrClose } from "react-icons/gr";
import { IoCheckmarkCircle } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

export const Toast: React.FC = () => {
  const { status, message, state } = useSelector(
    (state: RootState) => state.toast
  );
  const dispatch: AppDispatch = useDispatch();

  //   function that determines which icon to display depending on status, with color
  //   returns a tuple, 0 -> icon, 1 -> color for icon and bar, 2 -> background for icon
  const setIcon: (x: string) => [JSX.Element, string, string] = (
    statusValue
  ) => {
    switch (statusValue) {
      case "success":
        return [
          <IoCheckmarkCircle
            className={styles.icon}
            style={{ color: "#00db0b" }}
          />,
          "#00db0b",
          "#deffdf",
        ];
      case "warning":
        return [
          <IoIosWarning className={styles.icon} style={{ color: "#fcc603" }} />,
          "#fcc603",
          "#fdffe3",
        ];
      case "error":
        return [
          <RiErrorWarningFill
            className={styles.icon}
            style={{ color: "#fc4103" }}
          />,
          "#fc4103",
          "#ffdede",
        ];
      case "notice":
        return [
          <MdOutlineMessage
            className={styles.icon}
            style={{ color: "#0388fc" }}
          />,
          "#0388fc",
          "#def0ff",
        ];
      default:
        return [<div></div>, "", ""];
    }
  };

  return (
    <div
      className={`${styles.container} ${state == "open" ? styles.open : ""} ${
        state === "hide" ? styles.close : ""
      }`}
    >
      <div className={styles.info}>
        <div
          className={styles.icon_wrapper}
          style={{ backgroundColor: setIcon(status)[2] }}
        >
          {setIcon(status)[0]}
        </div>

        <p className={styles.status}>
          {status}
          <span>{message}</span>
        </p>

        <button
          className={styles.close_btn}
          onClick={() => dispatch({ type: "toast/hide" })}
        >
          <GrClose className={styles.close_icon} />
        </button>
      </div>

      <div
        className={`${styles.progress_bar} ${
          state === "open" ? styles.active : ""
        }`}
        style={{ backgroundColor: setIcon(status)[1] }}
      ></div>
    </div>
  );
};
