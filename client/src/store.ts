import { configureStore } from "@reduxjs/toolkit";
import { contactFormReducer } from "./reducers/contactFormReducer";
import { filterReducer } from "./reducers/filterReducer";

export const store = configureStore({
  reducer: {
    contactForm: contactFormReducer,
    filter: filterReducer,
  },
});

// get the type for RootState
export type RootState = ReturnType<typeof store.getState>;
// get the type of dispatch function for current store
export type AppDispatch = typeof store.dispatch;
