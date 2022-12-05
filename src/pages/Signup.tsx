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
} from "@ionic/react";
import logo from "../theme/images/triventure_logo.png";
import { arrowForwardOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import history from "../history";

const Signup = () => {
  const signupUser = () => {
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
          <span className="title">Sign Up</span>
          <br />
          <span className="subTitle"> Please sign up to begin...</span>
        </IonText>
        <IonItem>
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput type="text" placeholder="Enter your first name"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput type="text" placeholder="Enter your last name"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" placeholder="Enter your email"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" placeholder="Enter password"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput
            type="password"
            placeholder="Confirm your password"
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
