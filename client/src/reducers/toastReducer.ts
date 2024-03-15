import { IToast } from "../services/helper-functions/interfaces";

const initialState: IToast = {
  showToast: false,
  message: "Email sent successfully.",
  status: "success",
  state: "",
};

type actionType = {
  type: string;
  payload?: {
    status: "success" | "warning" | "error" | "notice";
    message: string;
  };
};

export const toastReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "toast/show":
      return { ...state, state: "open" };
    case "toast/hide":
      return { ...state, state: "hide" };
    case "toast/setInfo":
      return {
        ...state,
        status: action.payload!.status,
        message: action.payload!.message,
      };
    default:
      return state;
  }
};
