import axios from "axios";
import { IMenuItem } from "./interfaces";

// async function to fetch menu items
export const fetchMenuItems = async (signal) => {
  try {
    const response = await axios({
      signal: signal,
      method: "get",
      url: "http://localhost:3001/menu_items",
    });

    const results: IMenuItem[] = response.data;

    return results;
  } catch (err) {
    console.log(err);
  }
};
