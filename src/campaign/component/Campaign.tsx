import * as React from "react";

export interface ICampaign {
    gameType: string;
    campaignId: string;
    name: string;
    gmUserId: string;
}

interface ICampaignProps {
    campaign: ICampaign;
}

class Campaign extends React.Component<ICampaignProps, void> {
    public render() {
        const { gameType, campaignId, name, gmUserId } = this.props.campaign;

        return (
            <div className="campaign" key={campaignId}>
                    <h2>{name}</h2>
                    <h3>{gameType} </h3>
                    <h3>Created by user: {gmUserId} </h3>
            </div>
        );
    }
}

export default Campaign;
