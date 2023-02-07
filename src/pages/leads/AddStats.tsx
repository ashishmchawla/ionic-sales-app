import React, { useState, useEffect } from 'react';
import { IonButton, IonButtons, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonText, IonToolbar, useIonToast } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import history from '../../history';
import { RouteComponentProps } from 'react-router';
import { addNumber } from '../../integrations/lead';
import { useSelector } from 'react-redux';

interface Ownprops extends RouteComponentProps<{}> { }

interface AddStatsProps extends Ownprops { }

const AddStats: React.FC<AddStatsProps> = ({
    location,
    match: { params: id },
}) => {
    let state = {} as any;
    state = location.state;
    const currentUser = useSelector((state: any) => state.user.currentUser);
    const [present] = useIonToast();
    const [marginValue, setMarginValue] = useState(0);
    const [mfValue, setMfValue] = useState(0);
    const [insuranceValue, setInsuranceValue] = useState(0);
    const [optValue, setOptValue] = useState(0);

    const backToLeads = () => {
        console.log("Button Clicked");
        let tempId = {} as any;
        tempId = id;
        history.push({
            pathname: "/lead/" + tempId.lead_id,
        });
    };

    async function submitStats() {
        let temp3 = {} as any;
        temp3 = id;
        const addStats = await addNumber(
            id,
            marginValue,
            mfValue,
            insuranceValue,
            optValue,
            currentUser.id
        );
        if (typeof addStats === "object") {
            if (addStats.data.status === 1) {
                presentToast(addStats.data.message, "toast-success");
                history.push({
                    pathname: "/lead/" + temp3.lead_id,
                });
            } else {
                presentToast(addStats.data.error_message, "toast-warning");
            }
        }
        if (typeof addStats === "string") {
            presentToast(addStats, "toast-danger");
        }
    }

    const presentToast = (message: any, toastClass: any) => {
        present({
            message: message,
            duration: 1500,
            cssClass: toastClass,
            position: "top",
        });
    };
    return (

        <IonContent>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton onClick={backToLeads}>
                        <IonIcon src={chevronBack} />
                        Back
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <div className="add_leads">
                <IonText>
                    <h1>Create New Stats Entry</h1>
                </IonText>
                <IonItem>
                    <IonLabel position="floating">Margin Value (₹)</IonLabel>
                    <IonInput
                        type="text"
                        placeholder="Enter Margin Value (₹)"
                        onIonChange={(e: any) => setMarginValue(e.target.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Mutual Funds Value (₹)</IonLabel>
                    <IonInput
                        type="text"
                        placeholder="Enter Mutual Funds Value (₹)"
                        onIonChange={(e: any) => setMfValue(e.target.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Insurance Value (₹)</IonLabel>
                    <IonInput
                        type="text"
                        placeholder="Enter insurance Value (₹)"
                        onIonChange={(e: any) => setInsuranceValue(e.target.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Option brains Value (₹)</IonLabel>
                    <IonInput
                        type="text"
                        placeholder="Enter Option brains Value (₹)"
                        onIonChange={(e: any) => setOptValue(e.target.value)}
                    />
                </IonItem>
                <br />
                <IonButton shape="round" onClick={submitStats}>
                    Submit
                </IonButton>
            </div>
        </IonContent>
    )
}

export default AddStats