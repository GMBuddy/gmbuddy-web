import * as React from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { fetchCampaigns } from "../../actions/fetch/thunks";
import { IDispatch } from "~redux-thunk~redux";
import { connect } from "react-redux";
import Campaigns from "../../view/components/Campaigns";
import { ICampaign } from "gmbuddy/campaign";

interface IFetchCampaignsProps {
    dispatch: IDispatch;
    gameType: string;
    params: any;
}

interface IFetchCampaignsState {
    error: string;
    campaigns: ICampaign[];
    isFetching: boolean;
}

class FetchCampaigns extends React.Component<IFetchCampaignsProps, IFetchCampaignsState> {
    constructor(props) {
        super(props);

        let finalState = { campaigns: null, error: null, isFetching: false };
        finalState.isFetching = true;
        this.state = finalState;
    }

    public render() {
        const spinner = () => {
            if (!this.state.isFetching) {
                return null;
            }

            return <LoadingSpinner />;
        };

        const campaigns = () => {
            const campaignsData = this.state.campaigns;

            if (campaignsData) {
                if (!this.state.isFetching ) {
                    return <Campaigns gameType={this.props.gameType} campaigns={campaignsData} />;
                }
            }
        };

        return (
            <div>
                {spinner()}
                {campaigns()}
            </div>
        );
    }

    /* tslint:disable */
    private componentDidMount() {
        this.loadCampaignsData(this.props.gameType);
    }
    /* tslint:enable */

    private loadCampaignsData(gameType) {
        this.props.dispatch(fetchCampaigns(gameType,
            (campaigns) => {
                this.setState({ campaigns, isFetching: false } as IFetchCampaignsState);
            },
            (error) => this.setState({error} as IFetchCampaignsState)));
    }
}

const mapStateToProps = (state): Object => {
    if (state.campaign) {
        return { campaigns: state.campaign };
    }
};

export default connect(mapStateToProps)(FetchCampaigns);
