import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import history from "../../history";
import { addLead } from "../../integrations/lead";
import { useSelector } from "react-redux";

const AddLead = () => {
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const [present] = useIonToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [accountCategory, setAccountCategory] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [marginValue, setMarginValue] = useState(0);
  const [mfValue, setMfValue] = useState(0);
  const [insuranceValue, setInsuranceValue] = useState(0);
  const [optValue, setOptValue] = useState(0);

  const backToLeads = () => {
    console.log("Button Clicked");
    history.push({
      pathname: "/home",
      state: {
        tabName: "LeadsTab",
      },
    });
  };

  async function submitLead() {
    console.log(accountCategory);
    const addedLead = await addLead(
      firstName,
      lastName,
      contact,
      location,
      accountCategory,
      accountCode,
      marginValue,
      mfValue,
      insuranceValue,
      optValue,
      currentUser.id
    );
    if (typeof addedLead === "object") {
      if (addedLead.data.status === 1) {
        console.log(addedLead.data);
        presentToast(addedLead.data.message, "toast-success");
        history.push({
          pathname: "/lead/" + addedLead.data.lead.id,
        });
      } else {
        presentToast(addedLead.data.error_message, "toast-warning");
      }
    }
    if (typeof addedLead === "string") {
      presentToast(addedLead, "toast-danger");
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
          <IonInput
            placeholder="Enter First Name"
            onIonChange={(e: any) => setFirstName(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput
            placeholder="Enter Last Name"
            onIonChange={(e: any) => setLastName(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contact</IonLabel>
          <IonInput
            type="tel"
            placeholder="99XXXXXXXX"
            onIonChange={(e: any) => setContact(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Location</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter location"
            onIonChange={(e: any) => setLocation(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Account Code</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter account code"
            onIonChange={(e: any) => setAccountCode(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonSelect
            placeholder="Account Category"
            onIonChange={(e: any) => setAccountCategory(e.target.value)}
            multiple={true}
          >
            <IonSelectOption value="account">Account</IonSelectOption>
            <IonSelectOption value="margin">Margin</IonSelectOption>
            <IonSelectOption value="mutual_funds">Mutual Funds</IonSelectOption>
            <IonSelectOption value="insurance">Insurance</IonSelectOption>
            <IonSelectOption value="option_brains">
              Option Brains
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Margin Value (₹)</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter Margin Value (₹)"
            onIonChange={(e: any) => setMarginValue(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Mutual Funds Value (₹)</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter Mutual Funds Value (₹)"
            onIonChange={(e: any) => setMfValue(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Insurance Value (₹)</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter insurance Value (₹)"
            onIonChange={(e: any) => setInsuranceValue(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Option brains Value (₹)</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter Option brains Value (₹)"
            onIonChange={(e: any) => setOptValue(e.target.value)}
          />
        </IonItem>
        <br />
        <IonButton shape="round" onClick={submitLead}>
          Submit
        </IonButton>
      </div>
    </IonContent>
  );
};

export default AddLead;
