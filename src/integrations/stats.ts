import axios from "axios";
import { base_url } from "../environment";
const token = localStorage.getItem("token");
const user_id = localStorage.getItem("user_id");
const SERVER = base_url;
const options = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

export async function getStats() {
  try {
    const leads = await axios.get(SERVER + "/appStats/" + user_id, options);
    if (leads.data) {
      return leads;
    }
  } catch (error: any) {
    return error.response.data.message;
  }
}
