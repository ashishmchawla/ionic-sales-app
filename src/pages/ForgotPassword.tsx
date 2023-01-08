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
  IonNote,
  useIonToast,
} from "@ionic/react";
import logo from "../theme/images/triventure_logo.png";
import { arrowForwardOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { loginUser } from "../integrations/auth";
import history from "../history";
import { useDispatch } from "react-redux";
import {
  setAuthFailed,
  setAuthToken,
  setAuthSuccess,
} from "../redux/userSlice";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [present] = useIonToast();
  const dispatch = useDispatch();

  const presentToast = (message: any, toastClass: any) => {
    present({
      message: message,
      duration: 1500,
      cssClass: toastClass,
      position: "top",
    });
  };

  async function getIn() {
    // let loggedIn = await loginUser(email, password);
    // if (typeof loggedIn === "object") {
    //   if (loggedIn.data.status === 1) {
    //     dispatch(setAuthSuccess(loggedIn.data.user));
    //     dispatch(setAuthToken(loggedIn.data.token));
    //     localStorage.setItem("token", loggedIn.data.token);
    //     localStorage.setItem("user_id", loggedIn.data.user.id);
    //     history.push({
    //       pathname: "/home",
    //       state: {
    //         tabName: "HomeTab",
    //       },
    //     });
    //   }
    // }
    // if (typeof loggedIn === "string") {
    //   dispatch(setAuthFailed(loggedIn));
    //   presentToast(loggedIn, "toast-danger");
    // }
  }

  const checkPassword = (c_password: any) => {
    if (password == "") {
      presentToast("Password cannot be empty", "toast-danger");
    } else {
      if (password === c_password && password.length === c_password.length) {
        setCPassword(c_password);
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
          <span className="title">Reset Password</span>
          <br />
          <span className="subTitle">Setup a new password</span>
          <br />
        </IonText>

        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            placeholder="Enter password"
            onIonBlur={(e: any) => setPassword(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput
            type="password"
            placeholder="Enter password"
            onIonChange={(e: any) => checkPassword(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol offset="6" size="4">
              <IonButton
                shape="round"
                onClick={getIn}
                className="login_form_container__button"
              >
                Save Password
                <IonIcon
                  src={arrowForwardOutline}
                  className="login_form_container__button__icon"
                />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </div>
  );
};

export default ForgotPassword;
