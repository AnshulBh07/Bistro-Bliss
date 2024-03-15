import axios from "axios";
import { IMenuItem, paramsObjectType } from "./interfaces";

// async function to fetch menu items
export const fetchMenuItems = async (
  signal: AbortSignal,
  pageNum: number,
  paramsObject: paramsObjectType
) => {
  try {
    const response = await axios({
      signal: signal,
      method: "get",
      url: "https://bistro-bliss-backend-1.onrender.com/menu",
      params: {
        page: pageNum,
        paramsObject: JSON.stringify(paramsObject),
      },
    });

    const results: IMenuItem[] = response.data;

    return results;
  } catch (err) {
    console.log(err);
  }
};
