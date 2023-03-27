import React, { useEffect } from "react";
import history from "./history";
import { App as CapacitorApp } from "@capacitor/app";
import { IonSpinner } from "@ionic/react";

/* Extras */
const AppUrlListener: React.FC<any> = ({ location }) => {
  let currentLink = window.location.href;
  useEffect(() => {
    console.log("url clicker");
    CapacitorApp.addListener("backButton", (e: any) => {
      console.log("url clicker 2");
      let currentLink = window.location.href;
      console.log(currentLink);
      if (window.location.pathname === "/home/HomeTab") {
        CapacitorApp.exitApp();
      } else {
        if (currentLink.includes("MoreTab")) {
          console.log("Going back to Home");
          setTimeout(() => {
            history.push({
              pathname: "/home",
              state: {
                tabName: "HomeTab",
              },
            });
          }, 1000);
        } else if (currentLink.includes("LeadsTab")) {
          console.log("Going back to Home 1");
          setTimeout(() => {
            history.push({
              pathname: "/home",
              state: {
                tabName: "HomeTab",
              },
            });
          }, 1000);
        } else {
          console.log("Going back to Home 2");
          setTimeout(() => {
            history.push({
              pathname: "/home",
              state: {
                tabName: "HomeTab",
              },
            });
          }, 1000);
        }
      }
    });
  }, []);

  return (
    <>
      {currentLink.includes("login") ||
      currentLink.includes("signup") ||
      currentLink.includes("forgot") ? (
        <div className="spinner">
          <IonSpinner color="primary"></IonSpinner>
          <h3> Loading Data</h3>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AppUrlListener;
