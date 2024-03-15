import { configureStore } from "@reduxjs/toolkit";
import { contactFormReducer } from "./reducers/contactFormReducer";
import { filterReducer } from "./reducers/filterReducer";
import { menuItemReducer } from "./reducers/menuItemReducer";
import { cartReducer } from "./reducers/cartReducer";
import { toastReducer } from "./reducers/toastReducer";
import { loginReducer } from "./reducers/loginFormReducer";
import { signupReducer } from "./reducers/signupFormReducer";

export const store = configureStore({
  reducer: {
    contactForm: contactFormReducer,
    filter: filterReducer,
    menuItem: menuItemReducer,
    cart: cartReducer,
    toast: toastReducer,
    login: loginReducer,
    signup: signupReducer,
  },
});

// get the type for RootState
export type RootState = ReturnType<typeof store.getState>;
// get the type of dispatch function for current store
export type AppDispatch = typeof store.dispatch;
