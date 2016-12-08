import * as React from "react";
import { ICampaign } from "gmbuddy/campaign";
import {ICharacter} from "gmbuddy/character";
import {connect} from "react-redux";
import FetchCharacter from "../../../character/fetch/components/FetchCharacter";
import { Divider, Paper } from "material-ui";
import {SOCK_URL} from "../../../constants";

interface ICampaignProps {
    auth: any;
    campaign: ICampaign;
    dispatch: any;
}

interface ICampaignState {
    characters: ICharacter[];
}

let socket;

class Campaign extends React.Component<ICampaignProps, ICampaignState> {
    public render() {
        const { characters, gameType, campaignId, name, gmUserId } = this.props.campaign;

        let characterViews = [];

        characters.forEach(char => {
            characterViews.push(
                <Paper key={char} style={{margin: "15px", padding: "10px"}}>
                <FetchCharacter fromStore={true} gameType={gameType} characterId={char}/></Paper>
            );
            characterViews.push(<Divider key={"div" + char}/>);
        });

        return (
            <div className="campaign" key={campaignId}>
                    <h2>{name}</h2>
                    <h3>{gameType} </h3>
                    <h3>Created by user: {gmUserId} </h3>
                    <h3>Characters:</h3>
                    <Paper>
                        {characterViews}
                    </Paper>
            </div>
        );
    }

    /* tslint:disable */
    private componentDidMount() {
        socket = io(`${SOCK_URL}?campaignId=${this.props.campaign.campaignId}&token=${this.props.auth.data.token}/`, {"force new connection": true, path: '/'});


        socket.on('character/FETCH', (data) => console.log(data));
        socket.on('campaign/FETCH', (data) => console.log(data));
    }

    private componentWillUnmount() {
        socket.disconnect();
    }
    /* tslint:enable */
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Campaign);
