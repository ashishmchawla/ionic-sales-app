import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSearchbar,
  useIonViewWillEnter,
  IonBadge,
  IonImg,
  IonSpinner,
} from "@ionic/react";
import { Virtuoso } from "react-virtuoso";
import { add, caretForwardOutline } from "ionicons/icons";
import history from "../../history";
import { RouteComponentProps } from "react-router";
import { getLeads } from "../../integrations/lead";
import { useSelector } from "react-redux";
import four_o_four from "../../theme/images/four_o_four.png";

const LeadsTab: React.FC = () => {
  const [initialLeads, setInitialLeads] = useState([] as any);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state: any) => state.user.currentUser);

  async function callLeads() {
    const leads = await getLeads();
    if (leads.data.status === 1) {
      if (typeof leads === "object") {
        setInitialLeads(leads.data.results);
        setLoading(false);
      }
    } else {
      setInitialLeads([]);
      setLoading(false);
    }
  }

  useIonViewWillEnter(() => {
    callLeads();
  }, []);

  let leadData = [] as any;
  const openLeadDetails = (lead_id: any) => {
    history.push({
      pathname: "/lead/" + lead_id,
    });
  };

  const addLead = () => {
    history.push({
      pathname: "/addLead",
    });
  };

  return (
    <IonPage>
      <IonHeader className="pageHeader">
        <IonToolbar>
          <IonTitle color="primary">Leads</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" className="pageHeader">
          <IonToolbar>
            <IonTitle size="large" color="primary">
              Leads
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {loading ? (
          <div className="spinner">
            <IonSpinner color="primary"></IonSpinner>
            <h3> Loading Data</h3>
          </div>
        ) : (
          <IonContent className="leadContainer">
            <IonSearchbar
              showClearButton="focus"
              color="tertiary"
            ></IonSearchbar>
            {initialLeads.length > 0 ? (
              <Virtuoso
                className="leadContainerList"
                data={initialLeads}
                style={{ height: "100%" }}
                totalCount={100}
                itemContent={(index, lead) => {
                  var date = new Date(lead.updated_at);
                  let labelType = "light";
                  if (lead.lead_status === "appointment") {
                    labelType = "warning";
                  }
                  if (lead.lead_status === "lost") {
                    labelType = "danger";
                  }
                  if (lead.lead_status === "won") {
                    labelType = "success";
                  }
                  return (
                    <IonItem
                      key={index}
                      lines="none"
                      button
                      detail={true}
                      detailIcon={caretForwardOutline}
                      color="primary"
                      className="leadListItem"
                      onClick={() => openLeadDetails(lead.id)}
                    >
                      <IonLabel>
                        <h1>
                          {lead.first_name} {lead.last_name}
                        </h1>
                        <IonBadge color={labelType}>
                          {lead.lead_status.toUpperCase()}
                        </IonBadge>
                        <p>Last Contacted: {date.toDateString()}</p>
                      </IonLabel>
                    </IonItem>
                  );
                }}
              />
            ) : (
              <div className="no_leads">
                <IonImg src={four_o_four} />
                <h1>
                  No Leads found, <br /> you can add some now
                </h1>
              </div>
            )}
            <IonFab
              slot="fixed"
              vertical="bottom"
              horizontal="end"
              className="fab_button"
            >
              <IonFabButton color="light" onClick={addLead}>
                <IonIcon icon={add}></IonIcon>
              </IonFabButton>
            </IonFab>
          </IonContent>
        )}
      </IonContent>
    </IonPage>
  );
};

export default LeadsTab;
