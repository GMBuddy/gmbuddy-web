import * as React from "react";
import FetchCampaigns from "../components/FetchCampaigns";

interface ICampaignsProps {
    params: any;
}

class CampaignsView extends React.Component<ICampaignsProps, void> {
    public render() {
        const { gameType } = this.props.params;

        return <FetchCampaigns key={gameType} gameType={gameType}/>;
    }
}

export default CampaignsView;
