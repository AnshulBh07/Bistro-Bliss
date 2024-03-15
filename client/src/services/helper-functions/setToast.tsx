import { AppDispatch } from "../../store";

export const setToast = (
  status: string,
  message: string,
  dispatch: AppDispatch,
  timer: NodeJS.Timeout
) => {
  dispatch({ type: "toast/show" });
  dispatch({
    type: "toast/setInfo",
    payload: { status: status, message: message },
  });
  timer = setTimeout(() => {
    dispatch({ type: "toast/hide" });
  }, 4000);
  console.log(timer);
};
