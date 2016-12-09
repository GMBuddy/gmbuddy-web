import * as React from "react";
import * as Formsy from "formsy-react";
import { CLASSES, RACES } from "../../../constants/micro20";
import { MenuItem, FlatButton, RaisedButton } from "material-ui";
import CharacterDetails from "../../../creator/components/micro20/CharacterDetails";
import { FormsyText } from "formsy-material-ui/lib";
import { ICharacterData } from "gmbuddy/micro20/character";
import { editCharacter } from "../../../actions/edit/thunks";
import { connect } from "react-redux";
import { merge } from "lodash";
import { fetchCharacter } from "../../../actions/fetch/thunks";
import {editCampaign} from "../../../../campaign/actions/edit/thunks";

interface ICharacterViewerProps {
    character: ICharacterData;
    dispatch: any;
    editable: boolean;
    campaign: any;
}

interface ICharacterViewerState {
    canSubmit: boolean;
    canEdit: boolean;
    character: ICharacterData;
    editing: boolean;
    error: string;
}

class Micro20CharacterViewer extends React.Component<ICharacterViewerProps, ICharacterViewerState> {
    public refs: {
        form: any;
    };

    private classesMenu;
    private racesMenu;

    private constructor(props) {
        super(props);
        this.classesMenu = this.generateMenuItems(CLASSES);
        this.racesMenu = this.generateMenuItems(RACES);
        this.state = { canEdit: true, editing: false } as ICharacterViewerState;
    }

    public render() {
        const { baseStats, details, skills } = this.state.character || this.props.character;
        if (details.class && CLASSES[details.class]) {
            details.class = CLASSES[details.class];
        }

        if (details.race && RACES[details.race]) {
            details.race = RACES[details.race];
        }

        let error;
        if (this.state.error) {
            error = <p style={{color: "red"}}>{this.state.error}</p>;
        }

        let buttons;
        let campaignDetails;

        if (this.props.editable) {
            if (details.campaignId) {
                campaignDetails =   <p>
                                        <FlatButton onTouchTap={this.removeFromCampaign.bind(this)}>
                                            Remove from campaign
                                        </FlatButton>
                                    </p>;
            } else {
                campaignDetails = <p>Not currently in a campaign.</p>;
            }

            if (this.state.editing) {
                buttons = [
                    <FlatButton key="cancel" onTouchTap={ this.toggleEditing.bind(this) }>Cancel</FlatButton>,
                    <section key="spacer" className="spacer"/>,
                    <RaisedButton
                        type="submit"
                        key="save"
                        primary={true}
                        disabled={!this.state.canSubmit}
                    >Save</RaisedButton>,
                ];
            } else {
                buttons = [<FlatButton
                                key="edit"
                                onTouchTap={this.toggleEditing.bind(this)}>Edit Character</FlatButton>];
            }
        }

        return (
            <section className="characterViewer">
                {error}
                <Formsy.Form
                    ref="form"
                    onValidSubmit={this.submitForm.bind(this)}
                    onValid={this.enableSubmit.bind(this)}
                    onInvalid={this.disableSubmit.bind(this)}>
                    <h3>Details</h3>
                    <CharacterDetails editing={true} disabled={!this.state.editing} details={details}/>
                    <h3>Stats</h3>
                    <div className="characterStats">
                        <FormsyText
                            autoComplete="off"
                            name="baseStats.strength"
                            floatingLabelText="Strength"
                            value={baseStats.strength}
                            disabled={!this.state.editing}
                        />
                        <FormsyText
                            autoComplete="off"
                            name="baseStats.dexterity"
                            floatingLabelText="Dexterity"
                            value={baseStats.dexterity}
                            disabled={!this.state.editing}
                        />
                        <FormsyText
                            autoComplete="off"
                            name="baseStats.mind"
                            floatingLabelText="Mind"
                            value={baseStats.mind}
                            disabled={!this.state.editing}
                        />
                    </div>
                    <h3>Skills</h3>
                    <div className="characterSkills">
                        <FormsyText
                            autoComplete="off"
                            name="skills.communication"
                            floatingLabelText="Communication"
                            value={skills.communication}
                            disabled={!this.state.editing}
                        />
                        <FormsyText
                            autoComplete="off"
                            name="skills.knowledge"
                            floatingLabelText="Knowledge"
                            value={skills.knowledge}
                            disabled={!this.state.editing}
                        />
                        <FormsyText
                            autoComplete="off"
                            name="skills.physical"
                            floatingLabelText="Physical"
                            value={skills.physical}
                            disabled={!this.state.editing}
                        />
                        <FormsyText
                            autoComplete="off"
                            name="skills.subterfuge"
                            floatingLabelText="Subterfuge"
                            value={skills.subterfuge}
                            disabled={!this.state.editing}
                        />
                    </div>
                    <h3>Campaign</h3>
                    <FormsyText
                        autoComplete="off"
                        name="details.campaignId"
                        floatingLabelText="Campaign ID"
                        value={details.campaignId}
                        disabled={!this.state.editing}
                    />
                    {campaignDetails}
                    <div className="charViewEditButtons">
                        {buttons}
                    </div>
                </Formsy.Form>
            </section>);
    }

    private removeFromCampaign() {
        let campaign = this.props.campaign[this.props.character.details.campaignId];

        if (campaign) {
            this.props.dispatch(editCampaign(campaign, "",
                this.props.character.details.characterId, () => { this.refresh(); }));
        }
    }

    private refresh() {
        this.props.dispatch(fetchCharacter("micro20", this.props.character.details.characterId,
            (character) => {
                this.setState({ character } as ICharacterViewerState);
                this.resetValues();
            },
            error => {
                this.setState({ error } as ICharacterViewerState);
            }));
    }

    private resetValues() {
        this.refs.form.reset();
    }

    private enableSubmit() {
        this.setState({ canSubmit: true } as ICharacterViewerState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as ICharacterViewerState);
    }

    private submitForm(data) {
        this.props.dispatch(editCharacter(merge(this.props.character, data),
            () => {
                this.setState({ error: null } as ICharacterViewerState);
                this.refresh();
            },
            (error) => this.setState({ canEdit: true, editing: true, error } as ICharacterViewerState)));

        this.setState({ canEdit: false, editing: false } as ICharacterViewerState);
        this.disableSubmit();
    }

    private toggleEditing() {
        if (this.state.editing) {
            this.resetValues();
        }

        this.setState({ editing: !this.state.editing } as ICharacterViewerState);
    }

    // TODO: Remove duplication of this function
    private generateMenuItems(menuItems) {
        return menuItems.map((menuName, index) => {
            return <MenuItem key={index} value={menuName} primaryText={menuName} />;
        });
    }
}

function mapStateToProps(state) {
    const { campaign } = state;
    return { campaign };
}

export default connect(mapStateToProps)(Micro20CharacterViewer);
