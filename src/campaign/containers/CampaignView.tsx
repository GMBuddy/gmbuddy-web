import * as React from "react";
import Campaign from "../component/Campaign";

interface ICampaignProps {
    params: any;
}

class CampaignView extends React.Component<ICampaignProps, void> {
    public render() {
        const { campaignId, gameType } = this.props.params;

        return <Campaign campaignId={campaignId} gameType={gameType}/>;
    }

}

export default CampaignView;
