import { ILoginState } from "../services/helper-functions/interfaces";

const val: ILoginState = JSON.parse(localStorage.getItem("login")!);

const initialState: ILoginState = val
  ? val
  : {
      email: "",
      password: "",
      remember: false,
      show: false,
      isAuthenticated: false,
    };

type actionType = { type: string; payload?: string };

export const loginReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "login/email":
      return { ...state, email: action.payload! };
    case "login/password":
      return { ...state, password: action.payload! };
    case "login/remember":
      return { ...state, remember: !state.remember };
    case "login/show":
      return { ...state, show: !state.show };
    case "login/authenticate":
      return { ...state, isAuthenticated: !state.isAuthenticated };
    default:
      return state;
  }
};
