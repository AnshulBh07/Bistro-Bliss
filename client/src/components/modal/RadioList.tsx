import React from "react";
import styles from "../../sass/radioListStyles.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  optionArray: string[];
  category: number;
  title: string;
}

export const RadioList: React.FC<IProps> = ({
  optionArray,
  category,
  title,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { selected } = useSelector((state: RootState) => state.filter);

  const handleRadioOptionSelect = (category: number, index: number) => {
    dispatch({ type: "filter/radioSelect", payload: { category, index } });
    dispatch({ type: "filter/showBtns" });
  };

  return (
    <div className={styles.options}>
      <p>{title}</p>

      {optionArray.map((item, index) => {
        return (
          <label
            htmlFor={`${title}-option-${index + 1}`}
            key={index}
            className={styles.option_wrapper}
          >
            <input
              type="radio"
              name={title}
              id={`${title}-option-${index + 1}`}
              onChange={() => handleRadioOptionSelect(category, index)}
            />
            {/* custom circle */}
            <div
              className={styles.radio}
              style={{
                border: selected[category] === index ? "" : "2px solid #474747",
              }}
            >
              {selected[category] === index && <span></span>}
            </div>
            {item}
          </label>
        );
      })}
    </div>
  );
};
