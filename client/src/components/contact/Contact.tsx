import React, { useEffect, useState } from "react";
import styles from "../../sass/contactStyles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { ButtonSpinner } from "../loader/ButtonSpinner";
import axios from "axios";
import { Toast } from "../toasts/Toast";

export const Contact: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const details = useSelector((state: RootState) => state.contactForm);
  const { showToast } = useSelector((state: RootState) => state.toast);

  const { name, email, subject, message } = details;

  const [btnSpinner, setBtnSpinner] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setBtnSpinner(true);

    try {
      let status: "success" | "warning" | "error" | "notice",
        message: string = "";

      const response = await axios({
        method: "post",
        url: "http://localhost:3001/contact",
        data: details,
      });

      if (response.status) {
        switch (response.status) {
          case 200:
            status = "success";
            message = "Email sent. Please check your inbox";
            break;

          case 500 || 404:
            status = "error";
            message = "Some error occurred. Please try again later.";
            break;

          default:
            status = "warning";
            message = "Something unexpected occurred!";
            break;
        }

        dispatch({ type: "toast/show" });
        dispatch({
          type: "toast/setInfo",
          payload: { status: status, message: message },
        });

        // introduce a gap of 4 s
        setBtnSpinner(false);
        await new Promise((r) => setTimeout(r, 4000));
        dispatch({ type: "toast/show" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <section className={styles.container}>
        <div className={styles.bg1}></div>
        <div className={styles.bg2}></div>

        {/* contact form container */}
        <div className={styles.form_wrapper}>
          <div className={styles.heading}>
            <h1>contact us</h1>
            <p>
              We consider all the drivers of change give you components you need
              to change to create what truly happens
            </p>
          </div>

          {/* form */}
          <form
            method="post"
            className={styles.contact_form}
            onSubmit={handleFormSubmit}
          >
            <div className={styles.name_email_wrapper}>
              <label htmlFor="name">
                <p>name</p>
                <input
                  type="text"
                  className={styles.input_field}
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    dispatch({
                      type: "contactForm/name",
                      payload: String(e.target.value),
                    })
                  }
                />
              </label>

              <label htmlFor="email">
                <p>email</p>
                <input
                  type="text"
                  className={styles.input_field}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    dispatch({
                      type: "contactForm/email",
                      payload: String(e.target.value),
                    })
                  }
                />
              </label>
            </div>

            <label htmlFor="subject">
              <p>subject</p>
              <input
                type="text"
                className={styles.input_field}
                placeholder="Enter subject"
                value={subject}
                onChange={(e) =>
                  dispatch({
                    type: "contactForm/subject",
                    payload: String(e.target.value),
                  })
                }
              />
            </label>

            <label htmlFor="message">
              <p>
                message <span>{message.length} / 500</span>
              </p>
              <textarea
                name="message"
                id="message"
                cols={50}
                rows={10}
                className={styles.message}
                placeholder="Enter your message."
                maxLength={400}
                value={message}
                onChange={(e) =>
                  dispatch({
                    type: "contactForm/message",
                    payload: String(e.target.value),
                  })
                }
              ></textarea>
            </label>

            <button
              type="submit"
              className={styles.send_btn}
              disabled={btnSpinner && showToast}
            >
              {btnSpinner && <ButtonSpinner />}
              <p>send</p>
            </button>
          </form>

          {/* stuff under form */}
          <div className={styles.info}>
            <p style={{ color: "#ad343e", fontWeight: "600" }}>
              <span style={{ color: "black" }}>Call us:</span> + (414) 857 -
              0017
            </p>
            <p>
              <span>Hours:</span> Mon-Fri: 11am - 8pm Sat-Sun: 9am - 10pm
            </p>
            <p>
              <span>our location:</span> 123 bridge street, nowhere land, LA
              12345 ,united states
            </p>
          </div>
        </div>
      </section>

      <Toast />
    </React.Fragment>
  );
};
