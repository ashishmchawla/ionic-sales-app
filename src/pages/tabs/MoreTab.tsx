import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonToggle,
  IonAccordionGroup,
  IonAccordion,
  IonButton,
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

        <IonItem className="user_info">
          <IonAvatar slot="start" className="user_info_avatar">
            AC
          </IonAvatar>
          <IonLabel>
            <p className="title">Ashish Chawla</p>
            <p className="subTitle">Employee</p>
          </IonLabel>
        </IonItem>

        <IonList>
          <IonItemGroup>
            {/* <IonItemDivider>
              <IonLabel></IonLabel>
            </IonItemDivider> */}
            <IonAccordionGroup>
              <IonAccordion value="first">
                <IonItem slot="header" color="tertiary">
                  <IonLabel>Notifications</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  <IonItem>
                    <IonLabel>Show Notifications</IonLabel>
                    <IonToggle slot="end"></IonToggle>
                  </IonItem>
                </div>
              </IonAccordion>

              <IonAccordion value="second">
                <IonItem slot="header" color="tertiary">
                  <IonLabel>Account</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  <IonItem>
                    <IonLabel>Manage your account</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Change Avatar</IonLabel>
                  </IonItem>
                </div>
              </IonAccordion>

              <IonAccordion value="third">
                <IonItem slot="header" color="tertiary">
                  <IonLabel>Information</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  <IonItem>
                    <IonLabel>FAQ</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Privacy Policy</IonLabel>
                  </IonItem>
                </div>
              </IonAccordion>
            </IonAccordionGroup>
          </IonItemGroup>
        </IonList>
        <br />
        <IonButton fill="clear">Sign Out</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MoreTab;
