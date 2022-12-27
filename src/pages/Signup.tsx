import React, { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonImg,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import logo from "../theme/images/triventure_logo.png";
import { arrowForwardOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import history from "../history";
import { registerUser } from "../integrations/auth";
import { useDispatch } from "react-redux";
import { setAuthSuccess, setAuthFailed } from "../redux/userSlice";

const Signup = () => {
  let verified = 0;
  const dispatch = useDispatch();
  const [present] = useIonToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function signupUser() {
    let userSignUp = await registerUser(firstName, lastName, email, password);
    if (typeof userSignUp === "object") {
      if (userSignUp.data.statusCode === 200) {
        dispatch(setAuthSuccess(userSignUp.data));
        localStorage.setItem("token", userSignUp.data.token);
        localStorage.setItem("user_id", userSignUp.data._id);
        history.push({
          pathname: "/home",
          state: {
            tabName: "HomeTab",
          },
        });
      }
    }
    if (typeof userSignUp === "string") {
      dispatch(setAuthFailed(userSignUp));
      presentToast(userSignUp, "toast-danger");
    }
  }

  const presentToast = (message: any, toastClass: any) => {
    present({
      message: message,
      duration: 1500,
      cssClass: toastClass,
      position: "top",
    });
  };

  const checkPassword = (c_password: any) => {
    if (password == "") {
      presentToast("Password cannot be empty", "toast-danger");
    } else {
      if (password === c_password && password.length === c_password.length) {
        setConfirmPassword(c_password);
      } else {
        presentToast("Passwords do not match", "toast-warning");
      }
    }
  };

  return (
    <div className="login_form_page">
      <div className="login_form_container">
        <IonGrid>
          <IonRow>
            <IonCol size="2"></IonCol>
            <IonCol size="8">
              <IonImg src={logo} className="login_logo_image" />
            </IonCol>
            <IonCol size="2"></IonCol>
          </IonRow>
        </IonGrid>
        <IonText>
          <span className="title">Sign Up</span>
          <br />
          <span className="subTitle"> Please sign up to begin...</span>
        </IonText>
        <IonItem>
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter your first name"
            onIonChange={(e: any) => setFirstName(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter your last name"
            onIonChange={(e: any) => setLastName(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            placeholder="Enter your email"
            onIonChange={(e: any) => setEmail(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            placeholder="Enter password"
            onIonChange={(e: any) => setPassword(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput
            type="password"
            placeholder="Confirm your password"
            onIonBlur={(e: any) => checkPassword(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol offset="6" size="4">
              <IonButton
                shape="round"
                onClick={signupUser}
                className="login_form_container__button"
              >
                Sign up
                <IonIcon
                  src={arrowForwardOutline}
                  className="login_form_container__button__icon"
                />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
      <div className="login_form_footer">
        <IonText>
          Already have an account? <Link to="/login">Login</Link>
        </IonText>
      </div>
    </div>
  );
};

export default Signup;
