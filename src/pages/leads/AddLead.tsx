import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import history from "../../history";

const AddLead = () => {
  const backToLeads = () => {
    console.log("Button Clicked");
    history.push({
      pathname: "/home",
      state: {
        tabName: "LeadsTab",
      },
    });
  };
  return (
    <IonContent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={backToLeads}>
            <IonIcon src={chevronBack} />
            Back
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <div className="add_leads">
        <IonText>
          <h1>Create New Lead</h1>
        </IonText>
        <IonItem>
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput placeholder="Enter First Name" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput placeholder="Enter Last Name" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contact</IonLabel>
          <IonInput type="tel" placeholder="99XXXXXXXX" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Location</IonLabel>
          <IonInput type="text" placeholder="Enter location" />
        </IonItem>
      </div>
    </IonContent>
  );
};

export default AddLead;
