import axios from "axios";
import { base_url } from "../environment";
const token = localStorage.getItem("token");
const SERVER = base_url;
const options = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

export async function addLead(
  firstName: any,
  lastName: any,
  contact: any,
  location: any,
  accountCategory: any,
  accountCode: any,
  thirdParty: any,
  leadOwner: any
) {
  try {
    const createLead = await axios.post(
      SERVER + "/leads/createLead",
      {
        first_name: firstName,
        last_name: lastName,
        contact,
        location,
        account_category: accountCategory,
        account_code: accountCode,
        third_party: thirdParty,
        lead_owner: leadOwner,
      },
      options
    );
    if (createLead.data) {
      return createLead;
    }
  } catch (error: any) {
    return error.response.data.message;
  }
}

export async function getLeads() {
  try {
    const leads = await axios.get(SERVER + "/leads", options);
    if (leads.data) {
      return leads;
    }
  } catch (error: any) {
    return error.response.data.message;
  }
}

export async function getLeadDetails(id: any) {
  try {
    const leadDetail = await axios.get(
      SERVER + "/leads/" + id.lead_id,
      options
    );
    if (leadDetail.data) {
      return leadDetail;
    }
  } catch (error: any) {
    return error.response.data.message;
  }
}
