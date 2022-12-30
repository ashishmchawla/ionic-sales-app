import axios from "axios";
import { base_url } from "../environment";
const token = localStorage.getItem("token");
const SERVER = base_url;

export async function registerUser(
  firstName: any,
  lastName: any,
  email: any,
  password: any
) {
  try {
    const userAdded = await axios.post(SERVER + "/register", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    console.log(userAdded);
    if (userAdded.data) {
      return userAdded;
    }
  } catch (error: any) {
    return error.response.data.message;
  }
}

export async function loginUser(email: any, password: any) {
  try {
    const userLoggedIn = await axios.post(SERVER + "/login", {
      email: email,
      password: password,
    });
    if (userLoggedIn.data) {
      return userLoggedIn;
    }
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
}
