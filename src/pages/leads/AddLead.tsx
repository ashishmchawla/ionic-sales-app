import React, { useState, useEffect } from "react";
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
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import history from "../../history";

const AddLead = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [accountCategory, setAccountCategory] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [thirdParty, setThirdParty] = useState("");

  const backToLeads = () => {
    console.log("Button Clicked");
    history.push({
      pathname: "/home",
      state: {
        tabName: "LeadsTab",
      },
    });
  };

  const submitLead = () => {};

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
          >
            <IonSelectOption value="margin_details">
              Margin Details
            </IonSelectOption>
            <IonSelectOption value="third_party">Third Party</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            placeholder="Products"
            onIonChange={(e: any) => setThirdParty(e.target.value)}
          >
            <IonSelectOption value="insurance">Insurance</IonSelectOption>
            <IonSelectOption value="mutual_funds">Mutual Funds</IonSelectOption>
            <IonSelectOption value="option_brains">
              Option Brains
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <br />
        <IonButton shape="round" onClick={submitLead}>
          {" "}
          Submit
        </IonButton>
      </div>
    </IonContent>
  );
};

export default AddLead;
