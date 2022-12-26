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
    const userAdded = await axios.post(SERVER + "/user/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    console.log(userAdded);
    if (userAdded.data) {
      return userAdded;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
