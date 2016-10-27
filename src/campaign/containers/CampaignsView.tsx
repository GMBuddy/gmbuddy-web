import * as React from "react";
import FetchCampaigns from "../component/fetch/FetchCampaigns";

interface ICampaignsProps {
    params: any;
}

class CampaignsView extends React.Component<ICampaignsProps, void> {
    public render() {
        const { gameType } = this.props.params;

        return <FetchCampaigns gameType={gameType}/>;
    }
}

export default CampaignsView;
