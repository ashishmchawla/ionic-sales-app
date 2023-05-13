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
import logo from "../theme/images/logo_new.png";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    let loggedIn = await loginUser(email, password);
    console.log(loggedIn);
    if (typeof loggedIn === "object") {
      if (loggedIn.data.status === 1) {
        dispatch(setAuthSuccess(loggedIn.data.user));
        dispatch(setAuthToken(loggedIn.data.token));
        localStorage.setItem("token", loggedIn.data.token);
        localStorage.setItem("user_id", loggedIn.data.user.id);
        history.push({
          pathname: "/home",
          state: {
            tabName: "HomeTab",
          },
        });
      } else {
        presentToast(loggedIn.data.error_message, "toast-danger");
      }
    }
    if (typeof loggedIn === "string") {
      dispatch(setAuthFailed(loggedIn));
      presentToast(loggedIn, "toast-danger");
    }
    // history.push({
    //   pathname: "/home",
    //   state: {
    //     tabName: "HomeTab",
    //   },
    // });
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
          <span className="title">Login</span>
          <br />
          <span className="subTitle"> Please sign in to continue</span>
          <br />
        </IonText>

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            placeholder="Enter your email"
            onIonBlur={(e: any) => setEmail(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            placeholder="Enter password"
            onIonChange={(e: any) => setPassword(e.target.value)}
          ></IonInput>
          <IonNote slot="helper">
            <Link to="/forgot_password">Forgot Password</Link>
          </IonNote>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol offset="6" size="4">
              <IonButton
                shape="round"
                onClick={getIn}
                className="login_form_container__button"
              >
                Login
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
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </IonText>
      </div>
    </div>
  );
};

export default Login;
