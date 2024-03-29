import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/scss/main.scss";

/* URL Listener */
import AppUrlListener from "./AppUrlListener";

/* Components */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LeadDetails from "./pages/leads/LeadDetails";
import AddLead from "./pages/leads/AddLead";
import EditLead from "./pages/leads/EditLead";
import AddStats from "./pages/leads/AddStats";
import EditStats from "./pages/leads/EditStats";
import Policy from "./pages/Policy";
import Terms from "./pages/Terms";

setupIonicReact();

const App: React.FC = () => {
  const loginToken = localStorage.getItem("token");
  return (
    <IonApp>
      <IonReactRouter>
        <AppUrlListener></AppUrlListener>
        <IonRouterOutlet>
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to={`${loginToken ? "/home" : "/login"}`} />
            )}
          />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <Route exact path="/reset_password" component={ResetPassword} />
          <Route exact path="/lead/:lead_id" component={LeadDetails} />
          <Route exact path="/addLead" component={AddLead} />
          <Route exact path="/editLead/:lead_id" component={EditLead} />
          <Route exact path="/addStats/:lead_id" component={AddStats} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/policy" component={Policy} />
          <Route
            exact
            path="/editStats/:lead_amount_id"
            component={EditStats}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
