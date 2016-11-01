import * as React from "react";
import { ICampaign } from "./Campaign";
import { Card, CardActions, CardHeader, FlatButton } from "material-ui";
import { Link } from "react-router";

interface ICampaignProps {
    campaigns: ICampaign[];
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
                                    containerElement={<Link to={`/dnd35/campaign/${campaignId}`}/>}
                                />
                            </CardActions>
                        </Card>;
            });
        }

        return (
            <div className="campaigns">
                <h2>Here are all of the campaigns:</h2>
                {campaigns}
            </div>
        );
    }
}

export default Campaigns;
