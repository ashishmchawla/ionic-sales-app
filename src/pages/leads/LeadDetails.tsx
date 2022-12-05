import React, { useState } from "react";
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import history from "../../history";
import {
  addOutline,
  callOutline,
  chatboxOutline,
  chevronBack,
  createOutline,
  mailOutline,
} from "ionicons/icons";
import { Chrono } from "react-chrono";

interface Ownprops
  extends RouteComponentProps<{
    id?: any;
  }> {}

interface LeadDetailProps extends Ownprops {}

const LeadDetails: React.FC<LeadDetailProps> = ({
  location,
  match: { params: id },
}) => {
  const [activeSegment, setActiveSegment] = useState<string>("activity");
  const assignSegment = (value: any) => {
    console.log(value);
    setActiveSegment(value);
  };

  const backToLeads = () => {
    console.log("Button Clicked");
    history.push({
      pathname: "/home",
      state: {
        tabName: "LeadsTab",
      },
    });
  };

  const activityData = [
    {
      cardTitle: "Dunkirk",
      cardSubtitle: "May 1940",
      cardDetailedText: `On 10 May 1940, Hitler began his long-awaited offensive in the west by invading neutral Holland and Belgium and attacking northern France. Holland capitulated after only five days of fighting, and the Belgians surrendered on 28 May. With the success of the German ‘Blitzkrieg’, the British Expeditionary Force and French troops were in danger of being cut off and destroyed.`,
    },
    {
      cardTitle: "The Battle of Britain",
      cardSubtitle: "25 July 1940",
      cardDetailedText:
        "After France's surrender in June 1940, Churchill told the British people, “Hitler knows that he will have to break us in this island or lose the war”. To mount a successful invasion, the Germans had to gain air superiority. The first phase of the battle began on 10 July with Luftwaffe attacks on shipping in the Channel.",
    },
    {
      cardTitle: "Operation Barbarossa",
      cardSubtitle: "June 1941",
      cardDetailedText:
        "Since the 1920s, Hitler had seen Russia, with its immense natural resources, as the principal target for conquest and expansion. It would provide, he believed, the necessary 'Lebensraum', or living space, for the German people. And by conquering Russia, Hitler would also destroy the “Jewish pestilential creed of Bolshevism”. His non-aggression pact with Stalin in August 1939 he regarded as a mere temporary expedient.",
    },
  ];

  const notesData = [
    {
      cardTitle: "Dunkirk",
      cardSubtitle: "May 1940",
      cardDetailedText: `On 10 May 1940, Hitler began his long-awaited offensive in the west by invading neutral Holland and Belgium and attacking northern France. Holland capitulated after only five days of fighting, and the Belgians surrendered on 28 May. With the success of the German ‘Blitzkrieg’, the British Expeditionary Force and French troops were in danger of being cut off and destroyed.`,
    },
  ];

  return (
    <IonContent className="lead_details">
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={backToLeads}>
            <IonIcon src={chevronBack} />
            Back
          </IonButton>
        </IonButtons>
      </IonToolbar>

      <div className="lead_details_avatar_container">
        <div className="lead_details_avatar">AC</div>
        <div className="lead_details_title">Ashish Chawla</div>
      </div>

      <div className="lead_details_icons">
        <IonGrid>
          <IonRow>
            <IonCol className="lead_icon_container">
              <IonIcon className="lead_icon" src={callOutline}></IonIcon>
              <p className="lead_icon_title">Call</p>
            </IonCol>
            <IonCol className="lead_icon_container">
              <IonIcon className="lead_icon" src={mailOutline}></IonIcon>
              <p className="lead_icon_title">Mail</p>
            </IonCol>
            <IonCol className="lead_icon_container">
              <IonIcon className="lead_icon" src={chatboxOutline}></IonIcon>
              <p className="lead_icon_title">Text</p>
            </IonCol>
            <IonCol className="lead_icon_container">
              <IonIcon className="lead_icon" src={createOutline}></IonIcon>
              <p className="lead_icon_title">Edit</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>

      <div className="lead_details_info_container">
        <div className="lead_details_info">
          <div className="lead_details_info_single">
            <p className="info_heading">Display Name</p>
            <p className="info_title">Ashish Chawla</p>
          </div>
          <div className="lead_details_info_single">
            <p className="info_heading">Email</p>
            <p className="info_title">hey@ashishchawla.tech</p>
          </div>
          <div className="lead_details_info_single">
            <p className="info_heading">Phone</p>
            <p className="info_title">+91 8080644424</p>
          </div>
          <div className="lead_details_info_single">
            <p className="info_heading">Address</p>
            <p className="info_title">803, Amrut Heaven, Kalyan(W)</p>
          </div>
          <div className="segment_containter">
            <IonSegment
              value={activeSegment}
              onIonChange={(e) => assignSegment(e.target.value)}
            >
              <IonSegmentButton value="activity">Activities</IonSegmentButton>
              <IonSegmentButton value="notes">Notes</IonSegmentButton>
            </IonSegment>

            <div>
              {activeSegment === "activity" && (
                <Chrono
                  mode="VERTICAL"
                  items={activityData}
                  cardHeight={100}
                  hideControls={true}
                ></Chrono>
              )}

              {activeSegment === "notes" && (
                <>
                  <br />
                  <IonButton shape="round" slot="end" fill="outline">
                    <IonIcon slot="start" icon={addOutline}></IonIcon>
                    Add Note
                  </IonButton>
                  <Chrono
                    mode="VERTICAL"
                    items={notesData}
                    cardHeight={100}
                    hideControls={true}
                  ></Chrono>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  );
};

export default LeadDetails;
