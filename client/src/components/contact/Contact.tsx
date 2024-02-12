import React, { useEffect } from "react";
import styles from "../../sass/contactStyles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

export const Contact: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const details = useSelector((state: RootState) => state.contactForm);

  const { name, email, subject, message } = details;

  // console.log(details);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
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
                    payload: e.target.value,
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
                    payload: e.target.value,
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
                  payload: e.target.value,
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
                  payload: e.target.value,
                })
              }
            ></textarea>
          </label>

          <button type="submit" className={styles.send_btn}>
            send
          </button>
        </form>

        {/* stuff under form */}
        <div className={styles.info}>
          <p style={{ color: "#ad343e", fontWeight: "600" }}>
            <span style={{ color: "black" }}>Call us:</span> + (414) 857 - 0017
          </p>
          <p>
            <span>Hours:</span> Mon-Fri: 11am - 8pm Sat-Sun: 9am - 10pm
          </p>
          <p>
            <span>our location:</span> 123 bridge street, nowhere land, LA 12345
            ,united states
          </p>
        </div>
      </div>
    </section>
  );
};
