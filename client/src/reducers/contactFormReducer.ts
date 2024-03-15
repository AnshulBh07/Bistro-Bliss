import { IContactFormData } from "../services/helper-functions/interfaces";

const initialState: IContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export const contactFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case "contactForm/name":
      return { ...state, name: action.payload! };
    case "contactForm/email":
      return { ...state, email: action.payload! };
    case "contactForm/subject":
      return { ...state, subject: action.payload! };
    case "contactForm/message":
      return { ...state, message: action.payload! };
    default:
      return state;
  }
};
