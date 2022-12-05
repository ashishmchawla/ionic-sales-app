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

const LeadsTab: React.FC = () => {
  const leads = [
    {
      id: 1,
      label: "Ashish Chawla",
      updatedDate: "10 Nov 2022",
    },
    {
      id: 2,
      label: "A Chawla",
      updatedDate: "10 Nov 2022",
    },
    {
      id: 3,
      label: "Mr Chawla",
      updatedDate: "10 Nov 2022",
    },
  ];

  const openLeadDetails = (lead_id: any) => {
    history.push({
      pathname: "/lead/" + lead_id,
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
            data={leads}
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
            <IonFabButton color="light">
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default LeadsTab;
