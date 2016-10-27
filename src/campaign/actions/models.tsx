import { Schema, arrayOf } from "normalizr";

export const campaign = new Schema("campaign", {idAttribute: "campaignId"});
export const arrayOfCampaigns = arrayOf(campaign);
