import axios from "axios";
import { base_url } from "../environment";
const token = localStorage.getItem("token");
const SERVER = base_url;
const options = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

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

export async function verifyEmail(email: any) {
  try {
    const verify = await axios.post(SERVER + "/verifyEmail", { email });
    if (verify.data) {
      return verify;
    }
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
}

export async function resetPassword(password: any) {
  try {
    const reset = await axios.post(
      SERVER + "/forgotPassword",
      { password },
      options
    );
    if (reset.data) {
      return reset;
    }
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
}
