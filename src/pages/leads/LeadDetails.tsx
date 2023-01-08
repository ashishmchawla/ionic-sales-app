import React, { useEffect, useState } from "react";
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
  useIonToast,
  IonSpinner,
  IonTextarea,
  IonLabel,
  IonItem,
  IonDatetime,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import history from "../../history";
import {
  addOutline,
  callOutline,
  chevronBack,
  createOutline,
  mailOutline,
} from "ionicons/icons";
import { Chrono } from "react-chrono";
import {
  getLeadDetails,
  createReminder,
  createNote,
} from "../../integrations/lead";
import moment from "moment";

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
  const [activityLog, setActivityLog] = useState([] as any);
  const [loading, setLoading] = useState(true);
  const [leadData, setLeadData] = useState({} as any);
  const [showNote, setShowNote] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [note, setNote] = useState();
  const [reminder, setReminder] = useState();
  const [reminderTime, setReminderTime] = useState();
  const [present] = useIonToast();
  const assignSegment = (value: any) => {
    setActiveSegment(value);
  };

  const backToLeads = () => {
    history.push({
      pathname: "/home",
      state: {
        tabName: "LeadsTab",
      },
    });
  };

  const presentToast = (message: any, toastClass: any) => {
    present({
      message: message,
      duration: 1500,
      cssClass: toastClass,
      position: "top",
    });
  };

  async function callLeadDetails() {
    const leadDetails = await getLeadDetails(id);
    if (typeof leadDetails === "object") {
      if (leadDetails.data.status === 1) {
        setLeadData(leadDetails.data.details);
        setLoading(false);
        const activityData = [] as any;
        if (leadDetails.data.details.activities.length > 0) {
          leadDetails.data.details.activities.map((activity: any) => {
            var activityItem = {} as any;
            activityItem.cardSubtitle = moment(activity.updated_at).format(
              "DD MMM YYYY hh:mm a"
            );
            activityItem.cardDetailedText = activity.activity_log;
            activityItem.type = activity.activity_type;
            activityItem.remind_at = activity.remind_at;
            activityData.push(activityItem);
          });
          setActivityLog(activityData);
        }
      }
    }
    if (typeof leadDetails === "string") {
      presentToast(leadDetails, "toast-danger");
    }
  }

  useEffect(() => {
    callLeadDetails();
  }, []);

  const editLead = () => {
    history.push({
      pathname: "./editLead",
      state: {
        leadData: leadData,
      },
    });
  };

  const today = moment().format();

  async function saveNote() {
    const addNote = await createNote(id, note);
    if (typeof addNote === "object") {
      if (addNote.data.status === 1) {
        setShowNote(false);
        setShowReminder(false);
        setLoading(true);
        setTimeout(() => {
          callLeadDetails();
        }, 1500);
      }
    }
    if (typeof addNote === "string") {
      presentToast(addNote, "toast-danger");
    }
  }

  async function saveReminder() {
    const addReminder = await createReminder(id, reminder, reminderTime);
    if (typeof addReminder === "object") {
      if (addReminder.data.status === 1) {
        setShowNote(false);
        setShowReminder(false);
        setLoading(true);
        setTimeout(() => {
          callLeadDetails();
        }, 1500);
      }
    }
    if (typeof addReminder === "string") {
      presentToast(addReminder, "toast-danger");
    }
  }

  console.log(activityLog);

  return loading ? (
    <div className="spinner">
      <IonSpinner color="primary"></IonSpinner>
      <h3> Loading Data</h3>
    </div>
  ) : (
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
        <div className="lead_details_avatar">
          {leadData.first_name[0] + leadData.last_name[0]}
        </div>
        <div className="lead_details_title">
          {leadData.first_name + " " + leadData.last_name}
        </div>
      </div>

      <div className="lead_details_icons">
        <IonGrid>
          <IonRow>
            <IonCol className="lead_icon_container">
              <IonButton fill="clear" href={"tel:" + leadData.contact}>
                <IonIcon className="lead_icon" src={callOutline}></IonIcon>
              </IonButton>
              <p className="lead_icon_title">Call</p>
            </IonCol>
            <IonCol className="lead_icon_container">
              <IonButton fill="clear" href={"mailto:" + leadData.email}>
                <IonIcon className="lead_icon" src={mailOutline}></IonIcon>
              </IonButton>
              <p className="lead_icon_title">Mail</p>
            </IonCol>
            <IonCol className="lead_icon_container">
              <IonButton fill="clear" onClick={editLead}>
                <IonIcon className="lead_icon" src={createOutline}></IonIcon>
              </IonButton>
              <p className="lead_icon_title">Edit</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>

      <div className="lead_details_info_container">
        <div className="lead_details_info">
          <div className="lead_details_info_single">
            <p className="info_heading">Display Name</p>
            <p className="info_title">
              {leadData.first_name + " " + leadData.last_name}
            </p>
          </div>
          <div className="lead_details_info_single">
            <p className="info_heading">Email</p>
            <p className="info_title">
              {leadData.email ? leadData.email : "--"}
            </p>
          </div>
          <div className="lead_details_info_single">
            <p className="info_heading">Phone</p>
            <p className="info_title">+91 {leadData.contact}</p>
          </div>
          <div className="lead_details_info_single">
            <p className="info_heading">Address</p>
            <p className="info_title">
              {leadData.location ? leadData.location : "--"}
            </p>
          </div>
          <div className="lead_details_info_single">
            <p className="info_heading">Lead Status</p>
            <p className="info_title">{leadData.lead_status.toUpperCase()}</p>
          </div>
          {leadData.account_category ? (
            <div className="lead_details_info_single">
              <p className="info_heading">Account Category</p>
              <p className="info_title">{leadData.account_category}</p>
            </div>
          ) : (
            ""
          )}
          {leadData.account_code ? (
            <div className="lead_details_info_single">
              <p className="info_heading">Account Code</p>
              <p className="info_title">{leadData.account_code}</p>
            </div>
          ) : (
            ""
          )}
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
                <>
                  {leadData.activities.length > 0 ? (
                    <Chrono
                      mode="VERTICAL"
                      items={activityLog}
                      cardHeight={100}
                      hideControls={true}
                    ></Chrono>
                  ) : (
                    <div className="no_activities">
                      <h2>No Activities yet</h2>
                    </div>
                  )}
                </>
              )}

              {activeSegment === "notes" && (
                <>
                  <br />
                  <IonButton
                    shape="round"
                    onClick={() => {
                      setShowNote(!showNote);
                    }}
                  >
                    Add Note
                  </IonButton>
                  <IonButton
                    shape="round"
                    onClick={() => {
                      setShowReminder(!showReminder);
                    }}
                  >
                    Add Reminder
                  </IonButton>
                  <br />
                  <br />
                  {showNote ? (
                    <>
                      <IonItem>
                        <IonTextarea
                          placeholder="Add your notes"
                          autofocus={true}
                          onIonChange={(e: any) => setNote(e.target.value)}
                        ></IonTextarea>
                      </IonItem>
                      <br />
                      <IonButton
                        onClick={saveNote}
                        shape="round"
                        slot="end"
                        fill="outline"
                      >
                        <IonIcon slot="start" icon={addOutline}></IonIcon>
                        Save Note
                      </IonButton>
                    </>
                  ) : (
                    ""
                  )}
                  {showReminder ? (
                    <>
                      <IonItem>
                        <IonTextarea
                          placeholder="Add reminder for yourself"
                          autofocus={true}
                          onIonChange={(e: any) => setReminder(e.target.value)}
                        ></IonTextarea>
                      </IonItem>
                      <br />
                      <IonItem>
                        <IonLabel>Date and Time</IonLabel>
                        <IonDatetime
                          hourCycle="h12"
                          min={today}
                          minuteValues="0,15,30,45"
                          onIonChange={(e: any) =>
                            setReminderTime(e.target.value)
                          }
                        >
                          <span slot="title">Select a Reminder Date-Time</span>
                        </IonDatetime>
                      </IonItem>
                      <br />
                      <IonButton
                        onClick={saveReminder}
                        shape="round"
                        slot="end"
                        fill="outline"
                      >
                        <IonIcon slot="start" icon={addOutline}></IonIcon>
                        Save Reminder
                      </IonButton>
                    </>
                  ) : (
                    ""
                  )}
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
