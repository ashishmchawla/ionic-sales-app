import {
  IonContent,
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import BarGraph from "../../components/BarGraph";

const HomeTab: React.FC = () => {
  return (
    <IonPage className="homePageTab">
      <IonHeader className="pageHeader">
        <IonToolbar>
          <IonTitle color="primary">Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" className="pageHeader">
          <IonToolbar>
            <IonTitle size="large" color="primary">
              Home
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid class="homeTabPage">
          <IonRow>
            <IonCol>
              <IonText>
                <h1 className="pageTitle">Leads Overview</h1>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="homePageCard" color="primary">
                <IonCardHeader>
                  <IonCardTitle className="homePageCardTitle">27</IonCardTitle>
                  <IonCardSubtitle>Target</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="homePageCard" color="primary">
                <IonCardHeader>
                  <IonCardTitle className="homePageCardTitle">6</IonCardTitle>
                  <IonCardSubtitle>Achieved</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="homePageCard" color="primary">
                <IonCardHeader>
                  <IonCardTitle className="homePageCardTitle">7</IonCardTitle>
                  <IonCardSubtitle>Follow Ups</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="homePageCard" color="primary">
                <IonCardHeader>
                  <IonCardTitle className="homePageCardTitle">72%</IonCardTitle>
                  <IonCardSubtitle>Fulfilled</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h2 className="pageSubtitle">New Client Meetings</h2>
              </IonText>
              <BarGraph />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h2 className="pageSubtitle">Existing Client Meetings</h2>
              </IonText>
              <BarGraph />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h2 className="pageSubtitle">Account</h2>
              </IonText>
              <BarGraph />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h2 className="pageSubtitle">Margin</h2>
              </IonText>
              <BarGraph />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h2 className="pageSubtitle">Mutual Funds</h2>
              </IonText>
              <BarGraph />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h2 className="pageSubtitle">Insurance</h2>
              </IonText>
              <BarGraph />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
