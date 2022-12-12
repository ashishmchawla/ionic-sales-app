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
} from "@ionic/react";
import logo from "../theme/images/triventure_logo.png";
import { arrowForwardOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import history from "../history";

const Login = () => {
  const loginUser = () => {
    history.push({
      pathname: "/home",
      state: {
        tabName: "HomeTab",
      },
    });
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
          <span className="title">Login</span>
          <br />
          <span className="subTitle"> Please sign in to continue</span>
          <br />
        </IonText>

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" placeholder="Enter your email"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" placeholder="Enter password"></IonInput>
          <IonNote slot="helper">
            <Link to="">Forgot Password</Link>
          </IonNote>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol offset="6" size="4">
              <IonButton
                shape="round"
                onClick={loginUser}
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
