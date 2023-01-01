export interface LeadDetail {
  id: number;
  first_name: string;
  last_name: string;
  contact: number;
  location: string;
  account_category: string;
  account_code: string;
  third_party: string;
  stock_margin: number;
  lead_status: string;
  lead_owner: string;
  created_at: Date;
  updated_at: Date;
}

export interface LeadArray {
  leads: [LeadDetail];
}
