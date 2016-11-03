import * as React from "react";

interface ICampaignInviteProps {
    campaignId: string;
}

class CampaignInvite extends React.Component<ICampaignInviteProps, any> {
    public render() {
        return (
            <div>
                Share this easy to remember code with your friends: <strong>{this.props.campaignId}</strong>
                <br/>
                <p>In the future you can select friends from a list here.</p>
            </div>
        );
    }
}

export default CampaignInvite;
