import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import history from "../history";
import { chevronBack } from "ionicons/icons";

const Policy = () => {
  const backToLeads = () => {
    history.push({
      pathname: "/home",
      state: {
        tabName: "MoreTab",
      },
    });
  };
  return (
    <IonContent className="terms_page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={backToLeads}>
              <IonIcon src={chevronBack} />
              Back
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <div className="terms">
        <h1>Policies</h1>
      </div>

      <div className="terms_content">
        Triventure Advisory Pvt. Ltd. ("us", "we", or "our") operates &nbsp;
        <a href="https://triventure.in/">https://triventure.in/</a> (the
        "Site"). This page informs you of our policies regarding the collection,
        use and disclosure of Personal Information we receive from users of the
        Site. We use your Personal Information only for providing and improving
        the Site. By using the Site, you agree to the collection and use of
        information in accordance with this policy. Information Collection And
        Use While using our Site, we may ask you to provide us with certain
        personally identifiable information that can be used to contact or
        identify you. Personally identifiable information may include, but is
        not limited to your name ("Personal Information"). Log Data Like many
        site operators, we collect information that your browser sends whenever
        you visit our Site ("Log Data"). This Log Data may include information
        such as your computer's Internet Protocol ("IP") address, browser type,
        browser version, the pages of our Site that you visit, the time and date
        of your visit, the time spent on those pages and other statistics. In
        addition, we may use third party services such as Google Analytics that
        collect, monitor and analyze this … The Log Data section is for
        businesses that use analytics or tracking services in websites or apps,
        like Google Analytics. For the full disclosure section, create your own
        Privacy Policy. Communications We may use your Personal Information to
        contact you with newsletters, marketing or promotional materials and
        other information that ... The Communications section is for businesses
        that may contact users via email (email newsletters) or other methods.
        For the full disclosure section, create your own Privacy Policy. <br />
        <br />
        <span className="highlight">Cookies</span>
        <br /> Cookies are files with small amount of data, which may include an
        anonymous unique identifier. Cookies are sent to your browser from a web
        site and stored on your computer's hard drive. Like many sites, we use
        "cookies" to collect information. You can instruct your browser to
        refuse all cookies or to indicate when a cookie is being sent. However,
        if you do not accept cookies, you may not be able to use some portions
        of our Site. <br />
        <br />
        <span className="highlight">Security</span> <br />
        The security of your Personal Information is important to us, but
        remember that no method of transmission over the Internet, or method of
        electronic storage, is 100% secure. While we strive to use commercially
        acceptable means to protect your Personal Information, we cannot
        guarantee its absolute security. Changes To This Privacy Policy This
        Privacy Policy is effective as of 16th February 2023 and will remain in
        effect except with respect to any changes in its provisions in the
        future, which will be in effect immediately after being posted on this
        page. We reserve the right to update or change our Privacy Policy at any
        time and you should check this Privacy Policy periodically.
        <br />
        <br /> Your continued use of the Service after we post any modifications
        to the Privacy Policy on this page will constitute your acknowledgment
        of the modifications and your consent to abide and be bound by the
        modified Privacy Policy. If we make any material changes to this Privacy
        Policy, we will notify you either through the email address you have
        provided us, or by placing a prominent notice on our website. Contact Us
        If you have any questions about this Privacy Policy, please contact us.
      </div>
    </IonContent>
  );
};

export default Policy;
