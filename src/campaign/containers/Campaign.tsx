import * as React from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

interface ICampaignProps {
    campaignId: string;
    title: string;
    gameType: string;
    params: any;
}

interface ICampaignState {
    isFetching: boolean;
    gameType: string;
    title: string;
}

class Campaign extends React.Component<ICampaignProps, ICampaignState> {
    constructor() {
        super();
        this.state = { isFetching: true, gameType: null, title: null };
    }

    public render() {
        const { title, gameType, params } = this.props;
        const { campaignId } = params;

        const spinner = () => {
            if (!this.state.isFetching) {
                return null;
            }

            return <LoadingSpinner />;
        };

        return (
            <div className="campaignDnd35">
                {spinner()}
                <div className={this.state.isFetching ? "hidden" : ""}>
                    <h2>{campaignId}: {title}</h2>
                    <h3>Game type: {gameType} </h3>
                </div>
            </div>
        );
    }
}

export default Campaign;
