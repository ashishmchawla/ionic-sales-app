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
  IonHeader,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import history from "../../history";
import {
  addOutline,
  callOutline,
  chevronBack,
  createOutline,
  mailOutline,
  walletOutline,
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
  const [amountLog, setAmountLog] = useState([] as any);
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
        setAmountLog(leadDetails.data.amounts);
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
            return "";
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
      pathname: "/editLead/" + leadData.id,
      state: {
        leadData: leadData,
      },
    });
  };

  const addNumbers = () => {
    history.push({
      pathname: "/addStats/" + leadData.id,
    });
  };

  const updateAmount = (id: any, amounts: any) => {
    console.log(amounts);
    history.push({
      pathname: "/editStats/" + id,
      state: {
        amounts: amounts,
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
      } else {
        presentToast(addNote.data.error_message, "toast-danger");
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
      } else {
        presentToast(addReminder.data.error_message, "toast-danger");
      }
    }
    if (typeof addReminder === "string") {
      presentToast(addReminder, "toast-danger");
    }
  }

  return loading ? (
    <div className="spinner">
      <IonSpinner color="primary"></IonSpinner>
      <h3> Loading Data</h3>
    </div>
  ) : (
    <IonContent className="lead_details">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={backToLeads}>
              <IonIcon src={chevronBack} />
              Back
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
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
            <IonCol className="lead_icon_container">
              <IonButton fill="clear" onClick={addNumbers}>
                <IonIcon className="lead_icon" src={walletOutline}></IonIcon>
              </IonButton>
              <p className="lead_icon_title">Stats</p>
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
          {leadData.email ? (
            <div className="lead_details_info_single">
              <p className="info_heading">Email</p>
              <p className="info_title">
                {leadData.email ? leadData.email : "--"}
              </p>
            </div>
          ) : (
            ""
          )}
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
          {leadData.account_code ? (
            <div className="lead_details_info_single">
              <p className="info_heading">Account Code</p>
              <p className="info_title">{leadData.account_code}</p>
            </div>
          ) : (
            ""
          )}
          <IonButton
            shape="round"
            onClick={() => {
              setShowNote(!showNote);
            }}
          >
            Add Note
          </IonButton>
          {showNote ? (
            <>
              <br />
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
          <div className="segment_containter">
            <IonSegment
              value={activeSegment}
              onIonChange={(e) => assignSegment(e.target.value)}
            >
              <IonSegmentButton value="activity">Activities</IonSegmentButton>
              {/* <IonSegmentButton value="notes">Notes</IonSegmentButton> */}
              <IonSegmentButton value="stats">Stats</IonSegmentButton>
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
                      <br />
                      <h2>No Activities yet</h2>
                    </div>
                  )}
                </>
              )}

              {/* {activeSegment === "notes" && (
                
              )} */}
              {activeSegment === "stats" && (
                <>
                  <div className="tableDiv">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Updated By</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {amountLog.map((amount: any) => {
                          let returnValue = [];
                          console.log(amount);
                          let amountDate = moment(amount.created_at).format(
                            "DD MMM YYYY"
                          );
                          if (amount.marginValue) {
                            returnValue.push(
                              <tr key={amount.id + "a"}>
                                <td>{amountDate}</td>
                                <td>Margins</td>
                                <td>₹ {amount.marginValue}</td>
                                <td>
                                  {amount.owner_first_name +
                                    " " +
                                    amount.owner_last_name}
                                </td>
                                <td>
                                  <IonButton
                                    fill="clear"
                                    onClick={() =>
                                      updateAmount(amount.id, amount)
                                    }
                                  >
                                    <IonIcon
                                      className="lead_icon"
                                      src={createOutline}
                                    ></IonIcon>
                                  </IonButton>
                                </td>
                              </tr>
                            );
                          }
                          if (amount.mfValue) {
                            returnValue.push(
                              <tr key={amount.id + "b"}>
                                <td>{amountDate}</td>
                                <td>Mutual Funds</td>
                                <td>₹ {amount.mfValue}</td>
                                <td>
                                  {amount.owner_first_name +
                                    " " +
                                    amount.owner_last_name}
                                </td>
                                <td>
                                  <IonButton
                                    fill="clear"
                                    onClick={() =>
                                      updateAmount(amount.id, amount)
                                    }
                                  >
                                    <IonIcon
                                      className="lead_icon"
                                      src={createOutline}
                                    ></IonIcon>
                                  </IonButton>
                                </td>
                              </tr>
                            );
                          }
                          if (amount.insuranceValue) {
                            returnValue.push(
                              <tr key={amount.id + "c"}>
                                <td>{amountDate}</td>
                                <td>Insurance</td>
                                <td>₹ {amount.insuranceValue}</td>
                                <td>
                                  {amount.owner_first_name +
                                    " " +
                                    amount.owner_last_name}
                                </td>
                                <td>
                                  <IonButton
                                    fill="clear"
                                    onClick={() =>
                                      updateAmount(amount.id, amount)
                                    }
                                  >
                                    <IonIcon
                                      className="lead_icon"
                                      src={createOutline}
                                    ></IonIcon>
                                  </IonButton>
                                </td>
                              </tr>
                            );
                          }
                          if (amount.optValue) {
                            returnValue.push(
                              <tr key={amount.id + "d"}>
                                <td>{amountDate}</td>
                                <td>Option Brains</td>
                                <td>₹ {amount.optValue}</td>
                                <td>
                                  {amount.owner_first_name +
                                    " " +
                                    amount.owner_last_name}
                                </td>
                                <td>
                                  <IonButton
                                    fill="clear"
                                    onClick={() =>
                                      updateAmount(amount.id, amount)
                                    }
                                  >
                                    <IonIcon
                                      className="lead_icon"
                                      src={createOutline}
                                    ></IonIcon>
                                  </IonButton>
                                </td>
                              </tr>
                            );
                          }
                          return returnValue;
                        })}
                      </tbody>
                    </table>
                  </div>
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
