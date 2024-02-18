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
  const { appliedFilters } = useSelector((state: RootState) => state.filter);

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
              onChange={() => {
                dispatch({
                  type: "filter/radioAdd",
                  payload: { category: category, index: index },
                });
              }}
            />
            {/* custom circle */}
            <div
              className={styles.radio}
              style={{
                // if the current radio button is present in applied filters
                border:
                  appliedFilters.findIndex((item) => {
                    return item.category === category && item.index === index;
                  }) !== -1
                    ? ""
                    : "2px solid #474747",
              }}
            >
              {appliedFilters.findIndex((item) => {
                return item.category === category && item.index === index;
              }) !== -1 && <span></span>}
            </div>
            {item}
          </label>
        );
      })}
    </div>
  );
};
