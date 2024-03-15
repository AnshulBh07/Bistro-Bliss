import axios, { AxiosError, isAxiosError } from "axios";
import { ILoginState } from "./interfaces";

export const loginUser = async (loginObj: ILoginState, signal: AbortSignal) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://bistro-bliss-backend-1.onrender.com/login",
      data: loginObj,
      signal: signal,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else {
        console.error("Network error...");
      }
    }

    console.error(err);
  }
};

// function to verify persistent token
export const verifyToken = async (token: string) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://bistro-bliss-backend-1.onrender.com/verify_auto_login",
      data: { token: token },
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else {
        console.error("Network error....");
      }
    }
    console.error(err);
  }
};
