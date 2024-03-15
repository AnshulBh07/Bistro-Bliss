import { ISignupState } from "../services/helper-functions/interfaces";

const initialState: ISignupState = {
  email: "",
  first_name: "",
  last_name: "",
  username: "",
  password: "",
  terms: false,
  show: false,
};

type actionType = { type: string; payload?: string };

export const signupReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "signup/show":
      return { ...state, show: !state.show };
    case "signup/terms":
      return { ...state, terms: !state.terms };
    case "signup/first_name":
      return { ...state, first_name: action.payload! };
    case "signup/last_name":
      return { ...state, last_name: action.payload! };
    case "signup/username":
      return { ...state, username: action.payload! };
    case "signup/password":
      return { ...state, password: action.payload! };
    case "signup/email":
      return { ...state, email: action.payload! };
    default:
      return state;
  }
};
