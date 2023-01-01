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
} from "@ionic/react";
import { Virtuoso } from "react-virtuoso";
import { add, caretForwardOutline } from "ionicons/icons";
import history from "../../history";
import { RouteComponentProps } from "react-router";

const LeadsTab: React.FC = () => {
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
        <IonContent className="leadContainer">
          <IonSearchbar showClearButton="focus" color="tertiary"></IonSearchbar>
          <Virtuoso
            className="leadContainerList"
            data={leadData}
            style={{ height: "100%" }}
            totalCount={100}
            itemContent={(index, lead) => {
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
                    <h1>{lead.label}</h1>
                    <p>Last Contacted: {lead.updatedDate}</p>
                  </IonLabel>
                </IonItem>
              );
            }}
          />
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
      </IonContent>
    </IonPage>
  );
};

export default LeadsTab;
