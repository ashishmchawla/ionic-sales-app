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
import { useDispatch } from "react-redux";
import history from "../../history";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setLogOut } from "../../redux/userSlice";

const MoreTab: React.FC = () => {
  const currentUser = useAppSelector((state: any) => state.user.currentUser);
  const dispatch = useDispatch();
  const signout = () => {
    dispatch(setLogOut());
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    history.push({
      pathname: "/",
    });
  };

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
            {currentUser.first_name[0] + currentUser.last_name[0]}
          </IonAvatar>
          <IonLabel>
            <p className="title">
              {currentUser.first_name + " " + currentUser.last_name}
            </p>
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
        <IonButton fill="clear" onClick={signout}>
          Sign Out
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MoreTab;
