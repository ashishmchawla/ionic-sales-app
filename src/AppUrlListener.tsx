import React, { useEffect } from "react";
import history from "./history";
import { App } from "@capacitor/app";

/* Extras */
const AppUrlListener: React.FC<any> = ({ location }) => {
  useEffect(() => {
    App.addListener("backButton", (e: any) => {
      if (window.location.pathname === "/home/HomeTab") {
        App.exitApp();
      } else {
        let currentLink = window.location.href;
        if (currentLink.includes("MoreTab")) {
          history.push({
            pathname: "/home",
          });
        } else if (currentLink.includes("LeadsTab")) {
          history.push({
            pathname: "/home",
          });
        } else {
          history.go(-1);
        }
      }
    });
  }, []);

  return null;
};

export default AppUrlListener;
