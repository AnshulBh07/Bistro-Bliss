import React from "react";
import styles from "../../sass/radioListStyles.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { GiCheckMark } from "react-icons/gi";

interface IProps {
  optionArray: string[];
  category: number;
  title: string;
}

export const CheckBoxList: React.FC<IProps> = ({
  optionArray,
  category,
  title,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { appliedFilters } = useSelector((state: RootState) => state.filter);

  const handleCheckBoxSelect = (index: number) => {
    dispatch({
      type: "filter/checkboxAdd",
      payload: { category: category, index: index },
    });
  };

  return (
    <div className={styles.options}>
      <p>{title}</p>

      {optionArray.map((item, index) => {
        return (
          <label
            htmlFor={`${title}-type-${index + 1}`}
            key={index}
            className={styles.option_wrapper}
          >
            <input
              type="checkbox"
              name={`${title}-type-${index + 1}`}
              id={`${title}-type-${index + 1}`}
              onChange={() => handleCheckBoxSelect(index)}
            />
            {/* custom checkbox */}
            <div
              className={styles.checkbox}
              style={
                // if applied filters have current checkbox in it
                appliedFilters.findIndex((item) => {
                  return item.category === category && item.index === index;
                }) !== -1
                  ? {
                      backgroundColor: "#ad343e",
                      border: "2px solid #ad343e",
                    }
                  : {}
              }
            >
              <GiCheckMark className={styles.check} />
            </div>
            {item}
          </label>
        );
      })}
    </div>
  );
};
