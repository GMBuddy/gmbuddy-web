import * as React from "react";
import { Card, CardActions, CardHeader, FlatButton } from "material-ui";
import { Link } from "react-router";
import { ICampaign } from "gmbuddy/campaign";

interface ICampaignProps {
    campaigns: ICampaign[];
    gameType: string;
}

class Campaigns extends React.Component<ICampaignProps, void> {
    public render() {
        let campaigns;

        if (this.props.campaigns) {
            campaigns = Object.keys(this.props.campaigns).map((key) => {
                const campaign = this.props.campaigns[key];
                const {name, gmUserId, campaignId} = campaign;

                return <Card key={campaignId}>
                            <CardHeader
                                title={name}
                                subtitle={`Created by: ${gmUserId}`}
                            />
                            <CardActions>
                                <FlatButton
                                    label="View"
                                    containerElement={<Link to={`/${this.props.gameType}/campaign/${campaignId}`}/>}
                                />
                            </CardActions>
                        </Card>;
            });
        }

        return (
            <div className="campaigns">
                <h2>Your Campaigns</h2>
                {campaigns}
            </div>
        );
    }
}

export default Campaigns;
