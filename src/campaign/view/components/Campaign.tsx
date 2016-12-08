import * as React from "react";
import { ICampaign } from "gmbuddy/campaign";
import { ICharacter } from "gmbuddy/character";
import {connect} from "react-redux";
import FetchCharacter from "../../../character/fetch/components/FetchCharacter";
import { Tabs, Tab, FlatButton, Paper } from "material-ui";
import { SOCK_URL } from "../../../constants";
import { fetchCharacterSuccess } from "../../../character/actions/fetch/actions";
import { fetchCampaignSuccess } from "../../actions/fetch/actions";
import SwipeableViews from "react-swipeable-views";
import * as Formsy from "formsy-react";
import { FormsyText } from "formsy-material-ui/lib";
import { merge } from "lodash";
import {editCampaign} from "../../actions/edit/thunks";
import {ICampaignData} from "gmbuddy/campaign";

interface ICampaignProps {
    auth: any;
    character: any;
    campaign: ICampaign;
    liveCampaign: any;
    dispatch: any;
}

interface ICampaignState {
    characters: ICharacter[];
    slideIndex: number;
    editingTitle: boolean;
    canSubmitName: boolean;
}

let socket;

class Campaign extends React.Component<ICampaignProps, ICampaignState> {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            editingTitle: false,
            slideIndex: 0
        } as ICampaignState;
    }

    public render() {
        const liveCampaign = this.props.liveCampaign[this.props.campaign.campaignId];
        const { characters, gameType, campaignId, name, gmUserId } = liveCampaign || this.props.campaign;

        let characterViews = [];
        let characterTabs = [];

        characters.forEach((char, index) => {
            if (typeof char === "string") {
                const characterName = this.props.character[char].details.name;
                const canEdit = this.props.auth.data.id === gmUserId ||
                    this.props.auth.data.id === this.props.character[char].details.userId;

                characterViews.push(
                    <FetchCharacter
                        editable={canEdit}
                        key={char}
                        style={{margin: "15px"}}
                        fromStore={true}
                        gameType={gameType}
                        characterId={char}/>
                );
                characterTabs.push(<Tab key={char} label={characterName || char} value={index}/>);
            }
        });

        let title = <h2>{name}</h2>;

        if (gmUserId === this.props.auth.data.id) {
            if (this.state.editingTitle) {
                title = <Formsy.Form
                            onValidSubmit={this.submitForm.bind(this)}
                            onValid={this.enableSubmit.bind(this)}
                            onInvalid={this.disableSubmit.bind(this)}>
                            <FormsyText
                                name="name"
                                value={this.props.campaign.name}
                                validations="isExisty"
                                validationError="Please enter a name."
                                floatingLabelText="Name"
                                autoComplete="off"
                                required
                            />
                            <FlatButton
                                key="edit"
                                type="submit">Edit</FlatButton>
                            <FlatButton
                                key="cancel"
                                type="submit"
                                onTouchTap={this.editTitle.bind(this)}>Cancel</FlatButton>
                        </Formsy.Form>;
            } else {
                title = <section>
                            <strong>{name}</strong>
                            <FlatButton onTouchTap={this.editTitle.bind(this)}>Edit Name</FlatButton>
                        </section>;
            }
        }

        return (
            <div className="campaign" key={campaignId}>
                    {title}
                    <h3>Characters:</h3>

                    <Paper>
                        <Tabs
                            onChange={this.setSlideIndex.bind(this)}
                            value={this.state.slideIndex}
                        >
                            {characterTabs}
                        </Tabs>
                        <SwipeableViews
                            index={this.state.slideIndex}
                            onChangeIndex={this.setSlideIndex.bind(this)}
                            style={{margin: "15px"}}
                        >
                            {characterViews}
                        </SwipeableViews>
                    </Paper>
            </div>
        );
    }

    private enableSubmit() {
        this.setState({ canSubmitName: true } as ICampaignState);
    }

    private disableSubmit() {
        this.setState({ canSubmitName: false } as ICampaignState);
    }

    private submitForm(data) {
        this.props.dispatch(editCampaign({  campaignId: this.props.campaign.campaignId,
                                            gameType: this.props.campaign.gameType,
                                            name: data.name} as ICampaignData));

        this.props.campaign.name = data.name;
        this.state.editingTitle = false;
    }

    private editTitle() {
        this.setState({editingTitle: !this.state.editingTitle} as ICampaignState);
    }

    private setSlideIndex(value: number) {
        this.setState({slideIndex: value} as ICampaignState);
    }

    /* tslint:disable */
    private componentDidMount() {
        socket = io(`${SOCK_URL}?campaignId=${this.props.campaign.campaignId}&token=${this.props.auth.data.token}`);

        socket.on('character/FETCH', (data) => {
            console.log("sock, char: ", data);
            this.props.dispatch(fetchCharacterSuccess(data, merge({gameType: "micro20"})));
        });

        socket.on('campaign/FETCH', (data) => {
            console.log("sock, camp: ", data);
            let characterIds = [];

            data.characters.forEach(char => {
                this.props.dispatch(fetchCharacterSuccess(merge(char, {gameType: "micro20"})));
                characterIds.push(char.details.characterId);
            });

            this.props.dispatch(fetchCampaignSuccess(merge(data, {gameType: "micro20", characters: characterIds})));
        });
    }

    private componentWillUnmount() {
        socket.disconnect();
    }
    /* tslint:enable */
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        character: state.character,
        liveCampaign: state.campaign,
    };
}

export default connect(mapStateToProps)(Campaign);
