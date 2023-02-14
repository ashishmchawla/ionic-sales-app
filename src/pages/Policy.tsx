import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import history from "../history";
import { chevronBack } from "ionicons/icons";

const Policy = () => {
  const backToLeads = () => {
    history.push({
      pathname: "/home",
      state: {
        tabName: "MoreTab",
      },
    });
  };
  return (
    <IonContent className="terms_page">
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={backToLeads}>
            <IonIcon src={chevronBack} />
            Back
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <div className="terms">
        <h1>Policies</h1>
      </div>
    </IonContent>
  );
};

export default Policy;
