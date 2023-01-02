import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { IonReactRouter } from "@ionic/react-router";
import { cogSharp, homeSharp, listSharp } from "ionicons/icons";
import HomeTab from "./tabs/HomeTab";
import LeadsTab from "./tabs/LeadsTab";
import MoreTab from "./tabs/MoreTab";

interface Ownprops extends RouteComponentProps<{}> {}
interface HomeProps extends Ownprops {}

const Home: React.FC<HomeProps> = ({ location }) => {
  let state = {} as any;
  if (location.state !== undefined) {
    state = location.state;
  }

  return (
    <div>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home/HomeTab">
              <HomeTab />
            </Route>
            <Route exact path="/home/LeadsTab">
              <LeadsTab />
            </Route>
            <Route path="/home/MoreTab">
              <MoreTab />
            </Route>
            <Route exact path="/home">
              {state.tabName === undefined || state.tabName === "HomeTab" ? (
                <Redirect to="/home/HomeTab" />
              ) : state.tabName === "LeadsTab" ? (
                <Redirect to="/home/LeadsTab" />
              ) : (
                <Redirect to="/home/MoreTab" />
              )}
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" className="tabButtons">
            <IonTabButton tab="HomeTab" href="/home/HomeTab">
              <IonIcon icon={homeSharp} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="LeadsTab" href="/home/LeadsTab">
              <IonIcon icon={listSharp} />
              <IonLabel>Leads</IonLabel>
            </IonTabButton>
            <IonTabButton tab="MoreTab" href="/home/MoreTab">
              <IonIcon icon={cogSharp} />
              <IonLabel>More</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </div>
  );
};

export default Home;
