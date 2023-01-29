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
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import BarGraph from "../../components/BarGraph";
import { getStats } from "../../integrations/stats";

const HomeTab: React.FC = () => {
  const [counts, setCounts] = useState({} as any);
  const [graphData, setGraphData] = useState({} as any);

  async function callStats() {
    const leads = await getStats();
    console.log(leads);
    if (leads.data.status === 1) {
      if (typeof leads === "object") {
        setCounts(leads.data.counts);
        setGraphData(leads.data.graph_stats);
        // setInitialLeads(leads.data.results);
        // setOldLeads(leads.data.results);
        // setLoading(false);
      }
    } else {
      // setInitialLeads([]);
      // setLoading(false);
    }
  }

  useIonViewWillEnter(() => {
    callStats();
  }, []);
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
                  <IonCardTitle className="homePageCardTitle">
                    {counts.achieved}
                  </IonCardTitle>
                  <IonCardSubtitle>Achieved</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="homePageCard" color="primary">
                <IonCardHeader>
                  <IonCardTitle className="homePageCardTitle">
                    {counts.target}
                  </IonCardTitle>
                  <IonCardSubtitle>Target</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="homePageCard" color="primary">
                <IonCardHeader>
                  <IonCardTitle className="homePageCardTitle">
                    {counts.follow_ups}
                  </IonCardTitle>
                  <IonCardSubtitle>Follow Ups</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="homePageCard" color="primary">
                <IonCardHeader>
                  <IonCardTitle className="homePageCardTitle">
                    {counts.fulfilled}%
                  </IonCardTitle>
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
              <BarGraph type="new" data={graphData.new} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h2 className="pageSubtitle">Existing Client Meetings</h2>
              </IonText>
              <BarGraph type="existing" data={graphData.existing} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h2 className="pageSubtitle">Account</h2>
              </IonText>
              <BarGraph type="account" data={graphData.account} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h2 className="pageSubtitle">Margin</h2>
              </IonText>
              <BarGraph type="margin" data={graphData.margin} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h2 className="pageSubtitle">Mutual Funds</h2>
              </IonText>
              <BarGraph type="mutual_funds" data={graphData.mutual_funds} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h2 className="pageSubtitle">Insurance</h2>
              </IonText>
              <BarGraph type="insurance" data={graphData.insurance} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
