import * as React from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { fetchCampaign } from "../../actions/fetch/thunks";
import { IDispatch } from "~redux-thunk~redux";
import {connect} from "react-redux";
import Campaign from "../../view/components/Campaign";
import { ICampaign } from "gmbuddy/campaign";

interface IFetchCampaignProps {
    campaign: ICampaign;
    campaignId: string;
    dispatch: IDispatch;
    gameType: string;
    params: any;
}

interface IFetchCampaignState {
    campaign: ICampaign;
    error: string;
    isFetching: boolean;
}

class FetchCampaign extends React.Component<IFetchCampaignProps, IFetchCampaignState> {
    constructor(props) {
        super(props);

        let finalState = { campaign: null, error: null, isFetching: false };

        if (!props.campaign) {
            finalState.isFetching = true;
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
            const campaignData = this.state.campaign || this.props.campaign;

            if (campaignData) {
                if (!this.state.isFetching ) {
                    return <Campaign campaign={campaignData} />;
                }
            }
        };

        return (
            <div>
                {spinner()}
                {campaign()}
            </div>
        );
    }

    /* tslint:disable */
    private componentDidMount() {
        this.loadCampaignData(this.props.gameType, this.props.campaignId);
    }
    /* tslint:enable */

    private updateCampaignData(campaign) {
        this.setState({ campaign, isFetching: false } as IFetchCampaignState);
    }

    private loadCampaignData(gameType, campaignId) {
        this.props.dispatch(fetchCampaign(gameType, campaignId,
            (campaign) => this.updateCampaignData(campaign),
            (error) => this.setState({error} as IFetchCampaignState)));
    }
}

const mapStateToProps = (state, ownProps): Object => {
    const campaign = state.campaign[ownProps.campaignId];

    if (campaign) {
        return { campaign, isFetching: false };
    }
};

export default connect(mapStateToProps)(FetchCampaign);
