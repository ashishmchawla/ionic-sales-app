import React, { useEffect } from "react";
import history from "./history";
import { App as CapacitorApp } from "@capacitor/app";

/* Extras */
const AppUrlListener: React.FC<any> = ({ location }) => {
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
          history.replace({
            pathname: "/home",
            state: {
              tabName: "HomeTab",
            },
          });
        } else if (currentLink.includes("LeadsTab")) {
          console.log("Going back to Home");
          history.replace({
            pathname: "/home",
            state: {
              tabName: "HomeTab",
            },
          });
        } else {
          history.replace({
            pathname: "/home",
            state: {
              tabName: "HomeTab",
            },
          });
        }
      }
    });
  }, []);

  return null;
};

export default AppUrlListener;
