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
  useIonToast,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { chevronBack } from "ionicons/icons";
import history from "../../history";
import { editLead } from "../../integrations/lead";

interface Ownprops extends RouteComponentProps<{}> { }

interface LeadEditProps extends Ownprops { }

const EditLead: React.FC<LeadEditProps> = ({
  location,
  match: { params: id },
}) => {
  let state = {} as any;
  state = location.state;
  const [present] = useIonToast();
  const [firstName, setFirstName] = useState(state.leadData.first_name);
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [accountCategory, setAccountCategory] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [marginValue, setMarginValue] = useState(0);
  const [mfValue, setMfValue] = useState(0);
  const [insuranceValue, setInsuranceValue] = useState(0);
  const [optValue, setOptValue] = useState(0);

  const backToLeads = () => {
    console.log("Button Clicked");
    let tempId = {} as any;
    tempId = id;
    history.push({
      pathname: "/lead/" + tempId.lead_id,
    });
  };

  async function submitLead() {
    let temp3 = {} as any;
    temp3 = id;
    const editedLead = await editLead(
      id,
      firstName,
      lastName,
      contact,
      address,
      accountCategory,
      accountCode,
      marginValue,
      mfValue,
      insuranceValue,
      optValue,
      leadStatus
    );
    if (typeof editedLead === "object") {
      if (editedLead.data.status === 1) {
        presentToast(editedLead.data.message, "toast-success");
        history.push({
          pathname: "/lead/" + temp3.lead_id,
        });
      } else {
        presentToast(editedLead.data.error_message, "toast-warning");
      }
    }
    if (typeof editedLead === "string") {
      presentToast(editedLead, "toast-danger");
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

  useEffect(() => {
    console.log(state);
    let leadData = state.leadData;
    setFirstName(leadData.first_name);
    setLastName(leadData.last_name);
    setContact(leadData.contact);
    setAddress(leadData.location);
    setAccountCategory(leadData.account_category.split(','));
    setAccountCode(leadData.account_code);
    setLeadStatus(leadData.lead_status);
  }, []);

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
          <h1>Edit Lead</h1>
        </IonText>
        <IonItem>
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput
            placeholder="Enter First Name"
            value={firstName}
            onIonChange={(e: any) => setFirstName(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput
            placeholder="Enter Last Name"
            value={lastName}
            onIonChange={(e: any) => setLastName(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contact</IonLabel>
          <IonInput
            type="tel"
            placeholder="99XXXXXXXX"
            value={contact}
            onIonChange={(e: any) => setContact(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Location</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter location"
            value={address}
            onIonChange={(e: any) => setAddress(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Account Code</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter account code"
            value={accountCode}
            onIonChange={(e: any) => setAccountCode(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonSelect
            placeholder="Account Category"
            value={accountCategory}
            onIonChange={(e: any) => setAccountCategory(e.target.value)}
            multiple={true}
          >
            <IonSelectOption value="account">Account</IonSelectOption>
            <IonSelectOption value="margin">Margin</IonSelectOption>
            <IonSelectOption value="mutual_funds">Mutual Funds</IonSelectOption>
            <IonSelectOption value="insurance">Insurance</IonSelectOption>  <IonSelectOption value="option_brains">
              Option Brains
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Margin Value (₹)</IonLabel>
          <IonInput
            type="text"
            value={marginValue}
            placeholder="Enter Margin Value (₹)"
            onIonChange={(e: any) => setMarginValue(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Mutual Funds Value (₹)</IonLabel>
          <IonInput
            type="text"
            value={mfValue}
            placeholder="Enter Mutual Funds Value (₹)"
            onIonChange={(e: any) => setMfValue(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Insurance Value (₹)</IonLabel>
          <IonInput
            type="text"
            value={insuranceValue}
            placeholder="Enter insurance Value (₹)"
            onIonChange={(e: any) => setInsuranceValue(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Option brains Value (₹)</IonLabel>
          <IonInput
            type="text" value={optValue}
            placeholder="Enter Option brains Value (₹)"
            onIonChange={(e: any) => setOptValue(e.target.value)}
          />
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

export default EditLead;
