import React, { useState, useEffect } from "react";
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
  useIonToast,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import history from "../../history";
import { RouteComponentProps } from "react-router";
import { addNumber, editNumber } from "../../integrations/lead";
import { useSelector } from "react-redux";

interface Ownprops extends RouteComponentProps<{}> {}

interface EditStatsProps extends Ownprops {}

const EditStats: React.FC<EditStatsProps> = ({
  location,
  match: { params: id },
}) => {
  let state = {} as any;
  state = location.state;
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const [present] = useIonToast();
  const [leadId, setLeadId] = useState(0);
  const [marginValue, setMarginValue] = useState(0);
  const [mfValue, setMfValue] = useState(0);
  const [insuranceValue, setInsuranceValue] = useState(0);
  const [optValue, setOptValue] = useState(0);

  const backToLeads = () => {
    console.log("Button Clicked");
    history.push({
      pathname: "/lead/" + state.amounts.lead_id,
    });
  };

  async function submitStats() {
    const editStats = await editNumber(
      id,
      leadId,
      marginValue,
      mfValue,
      insuranceValue,
      optValue,
      currentUser.id
    );
    if (typeof editStats === "object") {
      if (editStats.data.status === 1) {
        presentToast(editStats.data.message, "toast-success");
        history.push({
          pathname: "/lead/" + leadId,
        });
      } else {
        presentToast(editStats.data.error_message, "toast-warning");
      }
    }
    if (typeof editStats === "string") {
      presentToast(editStats, "toast-danger");
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
    console.log(`Calling effect`);
    console.log(state);
    let amounts = state.amounts;
    setLeadId(amounts.lead_id);
    setMarginValue(amounts.marginValue);
    setMfValue(amounts.mfValue);
    setInsuranceValue(amounts.insuranceValue);
    setOptValue(amounts.optValue);
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
          <h1>Create New Stats Entry</h1>
        </IonText>
        <IonItem>
          <IonLabel position="floating">Margin Value (₹)</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter Margin Value (₹)"
            value={marginValue}
            onIonChange={(e: any) => setMarginValue(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Mutual Funds Value (₹)</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter Mutual Funds Value (₹)"
            value={mfValue}
            onIonChange={(e: any) => setMfValue(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Insurance Value (₹)</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter insurance Value (₹)"
            value={insuranceValue}
            onIonChange={(e: any) => setInsuranceValue(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Option brains Value (₹)</IonLabel>
          <IonInput
            type="text"
            placeholder="Enter Option brains Value (₹)"
            value={optValue}
            onIonChange={(e: any) => setOptValue(e.target.value)}
          />
        </IonItem>
        <br />
        <IonButton shape="round" onClick={submitStats}>
          Submit
        </IonButton>
      </div>
    </IonContent>
  );
};

export default EditStats;
