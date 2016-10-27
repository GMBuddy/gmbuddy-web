import * as React from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import {fetchCampaign} from "../actions/thunks";
import { IDispatch } from "~redux-thunk~redux";
import {connect} from "react-redux";
import { find, merge } from "lodash";

interface ICampaign {
    gameType: string;
    campaignId: string;
    title: string;
    gmUserId: string;
}

interface ICampaignProps {
    campaignId: string;
    gameType: string;
    dispatch: IDispatch;
    params: any;
    campaign: ICampaign;
}

interface ICampaignState {
    isFetching: boolean;
    error: string;
    campaign: ICampaign;
}

class Campaign extends React.Component<ICampaignProps, ICampaignState> {
    constructor(props) {
        super(props);

        let finalState = { isFetching: false, error: null, campaign: null };

        if (props.campaignId && props.gameType && !props.campaign) {
            finalState.isFetching = true;
            this.loadCampaignData(props.gameType, props.campaignId);
        }

        this.state = finalState;
    }

    public render() {

        const spinner = () => {
            if (!this.state.isFetching) {
                return null;
            }

            return <LoadingSpinner />;
        };

        const campaign = () => {
            if(this.state.campaign || this.props.campaign) {
                const { title, gameType, gmUserId } = this.props.campaign || this.state.campaign;

                return <div className={this.state.isFetching ? "hidden" : ""}>
                            <h2>{title}</h2>
                            <h3>{gameType} </h3>
                            <h3>Created by user: {gmUserId} </h3>
                        </div>;
            }
        }

        return (
            <div className="campaignDnd35">
                {spinner()}
                {campaign()}
            </div>
        );
    }

    private loadCampaignData(gameType, campaignId) {
        this.props.dispatch(fetchCampaign(gameType, campaignId,
            (campaign) => {
                this.setState({ campaign, isFetching: false } as ICampaignState)
            },
            (error) => this.setState({error} as ICampaignState)));
    }
}

const mapStateToProps = (state, ownProps): Object => {
    const campaign = find(state.campaign.campaignReducer, "campaignId", ownProps.campaignId);

    if (campaign) {
        return { campaign, isFetching: false };
    }

    return { };
}

export default connect(mapStateToProps)(Campaign);
