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
import { loginUser, verifyEmail } from "../integrations/auth";
import history from "../history";
import { useDispatch } from "react-redux";
import {
  setAuthFailed,
  setAuthToken,
  setAuthSuccess,
} from "../redux/userSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
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

  async function checkEmail() {
    let verify = await verifyEmail(email);

    if (typeof verify === "object") {
      if (verify.data.status === 1) {
        dispatch(setAuthSuccess(verify.data.user));
        dispatch(setAuthToken(verify.data.token));
        localStorage.setItem("token", verify.data.token);
        localStorage.setItem("user_id", verify.data.user.id);
        history.push({
          pathname: "/reset_password",
        });
      } else {
        presentToast(verify.data.error_message, "toast-danger");
      }
    }
    if (typeof verify === "string") {
      dispatch(setAuthFailed(verify));
      presentToast(verify, "toast-danger");
    }
  }

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
          <span className="subTitle">Enter your email</span>
          <br />
        </IonText>

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            placeholder="Enter your email"
            onIonChange={(e: any) => setEmail(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol offset="6" size="4">
              <IonButton
                shape="round"
                onClick={checkEmail}
                className="login_form_container__button"
              >
                Proceed
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
