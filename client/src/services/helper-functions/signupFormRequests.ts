import axios, { AxiosError, isAxiosError } from "axios";
import { ISignupState } from "./interfaces";

export const findUsername = async (username: string) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://bistro-bliss-backend-1.onrender.com/username",
      params: { username: username },
    });

    return response.status;
  } catch (err) {
    // in axios if a server return a 4xx or 5xx status , catch block is executed
    // we using typescript so typecast err to AxiosError type
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response.status;
      }
    }

    console.error(err);
  }
};

export const addUser = async (signupObj: ISignupState) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://bistro-bliss-backend-1.onrender.com/signup",
      data: signupObj,
    });

    if (response) return response.status;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response.status;
      }
    }

    console.error(err);
  }
};
