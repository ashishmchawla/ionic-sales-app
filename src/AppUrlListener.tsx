import React, { useEffect } from "react";
import history from "./history";
import { App } from "@capacitor/app";

/* Extras */
const AppUrlListener: React.FC<any> = ({ location }) => {
  useEffect(() => {
    App.addListener("backButton", (e: any) => {
      let currentLink = window.location.href;
      console.log(currentLink);
      if (window.location.pathname === "/home/HomeTab") {
        App.exitApp();
      } else {
        if (currentLink.includes("MoreTab")) {
          history.push({
            pathname: "/home",
            state: {
              tabName: "HomeTab",
            },
          });
        } else if (currentLink.includes("LeadsTab")) {
          history.push({
            pathname: "/home",
            state: {
              tabName: "HomeTab",
            },
          });
        } else {
          history.push({
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
