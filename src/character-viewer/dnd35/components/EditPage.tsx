import * as React from "react";
import { RaisedButton } from "material-ui";
import * as Formsy from "formsy-react";
import { FormsyText } from "formsy-material-ui/lib";
import CharacterSkills from  "../components/SkillsPage";

import {ICharacterData } from "character-data/dnd35/CharacterData";

interface IDnD35CharacterEditorProps {
    data: ICharacterData;
}

interface IDnD35CharacterEditorState {
    canPrevious: boolean;
    canSubmit: boolean;
    dnd35data: any;
    data: any;
}

class EditPage extends React.Component<IDnD35CharacterEditorProps, IDnD35CharacterEditorState> {
    constructor() {
        super();
        this.state = {
            canPrevious: true,
            canSubmit: false,
            data: { details: {},  items: [], stats: {}},
        } as IDnD35CharacterEditorState;
    }

    public render() {

        let details = Object.keys(this.props.data.details).map((key) => {
            let value = this.props.data.details[key];
            value = value.charAt(0).toUpperCase() + value.slice(1);
            const capitalKey = key.charAt(0).toUpperCase() + key.slice(1);
            let className = "detailDiv" + capitalKey;
            return (<div className={className} key={key}>
                        <div>
                            <FormsyText
                                autoComplete="off"
                                name="details.name"
                                floatingLabelText={capitalKey}
                                value={value}
                                required
                            />
                        </div>
                    </div>);
        });
        let modifiers = {};
        let statsDom = Object.keys(this.props.data.stats).map((key) => {
            const value = this.props.data.stats[key];
            const tinyName = key.substring(0, 3).toUpperCase();
            const modifier = Math.floor((this.props.data.stats[key] - 10) / 2);
            modifiers[tinyName] = modifier;
            let tempValue = value;
            let tempMod = modifier;
            return (
                <div className="abilityBox" key={key}>
                    <div className="abilityNameBox">
                        <div>
                            <p className="shortStatName">{tinyName}</p>
                            <p className="fullStatName">{key}</p>
                        </div>
                    </div>
                    <div className="abilityScoreBox">
                        <div className="borderDiv">
                            <FormsyText
                                autoComplete="off"
                                name="stats.abilityScore"
                                value={value}
                                required
                                />
                        </div>
                    </div>
                    <div className="abilityModBox">
                        <div className="borderDiv">
                            <p>{modifier}</p>
                        </div>
                    </div>
                    <div className="abilityTempScore">
                        <div className="borderDiv">
                            <FormsyText
                                    autoComplete="off"
                                    name="stats.abilityScore"
                                    value={tempValue}
                                    required
                                    />
                        </div>
                    </div>
                    <div className="abilityTempMod">
                        <div className="borderDiv">
                            <p>{tempMod}</p>
                        </div>
                    </div>
                </div>);
        });
        let skillsDom = <CharacterSkills
                        key="skills"
                        skills={this.props.data.skills}
                        modifiers={modifiers}
                        editMode={1} />;
        return(
            <div className="editDiv">
                <Formsy.Form
                    className="characterCreatorForm"
                    onValidSubmit={this.submitForm.bind(this)}
                    onValid={this.enableSubmit.bind(this)}
                    onInvalid={this.disableSubmit.bind(this)}
                >
                    <section className="charEditDetails">
                        <div className="details">
                            {details}
                        </div>
                        <div className="stats">
                            <div className="abilityHeaders">
                                <p className="abilityName">Ability Name</p>
                                <p>Ability<br/>Score</p>
                                <p>Ability<br/>Modifier</p>
                                <p>Temporary<br/>Score</p>
                                <p>Temporary<br/>Modifier</p>
                            </div>
                            <div className="abilityRows">
                                {statsDom}
                            </div>
                        </div>
                        <div className="skillsOverview">
                            {skillsDom}
                        </div>
                    </section>
                    <RaisedButton
                        key="done"
                        className="characterEditorSubmit"
                        type="submit"
                        primary={true}
                        >Done</RaisedButton>
                </Formsy.Form>
            </div>
        );
    }
    private enableSubmit() {
        this.setState({ canSubmit: true } as IDnD35CharacterEditorState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as IDnD35CharacterEditorState);
    }
     private submitForm(data) {
        // console.info("Submit D&D 3.5 data:", this.state.data);
        this.setState({ canPrevious: false } as IDnD35CharacterEditorState);
        this.disableSubmit();
    }
}

export default EditPage;
