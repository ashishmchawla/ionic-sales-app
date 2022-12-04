import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const MoreTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="pageHeader">
        <IonToolbar>
          <IonTitle color="primary">More</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" className="pageHeader">
          <IonToolbar>
            <IonTitle size="large" color="primary">
              More
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default MoreTab;
