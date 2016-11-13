import * as React from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { fetchCampaigns } from "../../actions/fetch/thunks";
import { IDispatch } from "~redux-thunk~redux";
import { connect } from "react-redux";
import { ICampaign } from "../Campaign";
import Campaigns from "../Campaigns";

interface IFetchCampaignsProps {
    campaigns: ICampaign[];
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

        if (!props.campaigns || Object.keys(props.campaigns).length === 0) {
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

        const campaigns = () => {
            const campaignsData = this.state.campaigns || this.props.campaigns;

            if (campaignsData) {
                if (!this.state.isFetching ) {
                    return <Campaigns campaigns={campaignsData} />;
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
