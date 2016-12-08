import * as React from "react";
import FetchCampaign from "../components/FetchCampaign";

interface ICampaignProps {
    params: any;
}

class CampaignView extends React.Component<ICampaignProps, void> {
    public render() {
        const { campaignId, gameType } = this.props.params;

        return <FetchCampaign campaignId={campaignId} gameType={gameType}/>;
    }
}

export default CampaignView;
