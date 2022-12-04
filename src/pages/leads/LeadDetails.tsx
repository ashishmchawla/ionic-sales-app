import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import history from "../../history";
import { chevronBack } from "ionicons/icons";

interface Ownprops
  extends RouteComponentProps<{
    id?: any;
  }> {}

interface LeadDetailProps extends Ownprops {}

const LeadDetails: React.FC<LeadDetailProps> = ({
  location,
  match: { params: id },
}) => {
  const backToLeads = () => {
    history.push({
      pathname: "/home",
      state: {
        tabName: "leads",
      },
    });
  };

  return (
    <IonContent className="lead_details">
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton>
            <IonIcon src={chevronBack} onClick={backToLeads} />
            Back
          </IonButton>
        </IonButtons>
      </IonToolbar>

      <div className="lead_details_avatar_container">
        <div className="lead_details_avatar">AC</div>
      </div>
    </IonContent>
  );
};

export default LeadDetails;
