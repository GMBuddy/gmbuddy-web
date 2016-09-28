import * as React from "react";

import CharacterStepper from "../components/CharacterStepper";
import CharacterReview from "../components/CharacterReview";
import CharacterModule from "../components/CharacterModule";

import { connect } from "react-redux";

import { RaisedButton, Paper, Divider } from "material-ui";
import * as Formsy from "formsy-react";

import NotFound from "../../layout/components/NotFound";

interface ICharacterCreatorState {
    characterData: any;
    canPrevious: boolean;
    canSubmit: boolean;
    currentStep: number;
}

class CharacterCreator extends React.Component<void, ICharacterCreatorState> {
    private getSteps() {
        switch (this.state.characterData.gameType) {
            case "dnd35":
                return ["Module", "Details", "Stats", "Skills", "Spells", "Items","Review"]
            case "dnd5":
                return ["Module", "D&D 5e Stuff", "Misc.", "Review"]
            default:
                return ["Module", "...", "Review"]
        }
    }

    constructor() {
        super();
        this.state = {
            characterData: { gameType: null },
            canPrevious: true,
            canSubmit: false,
            currentStep: 0,
        } as ICharacterCreatorState;
    }

    public render() {
        const steps = this.getSteps();
        let buttons = [];
        let characterStep;

        if (this.state.currentStep > 0) {
            buttons.push(<RaisedButton
                key="prev"
                className="characterCreatorPrevious"
                onTouchTap={this.previousStep.bind(this)}
                disabled={!this.state.canPrevious}>Previous</RaisedButton>);
        }

        if (this.state.currentStep < steps.length - 1) {
            buttons.push(<RaisedButton
                            key="next"
                            className="characterCreatorNext"
                            type="submit"
                            disabled={!this.state.canSubmit}>Next</RaisedButton>);
        } else {
            buttons.push(<RaisedButton
                            key="done"
                            className="characterCreatorSubmit"
                            type="submit"
                            primary={true}
                            disabled={!this.state.canSubmit}>Done</RaisedButton>);
        }

        switch (this.state.currentStep) {
            case 0:
                characterStep = <CharacterModule gameType={this.state.characterData.gameType}/>;
                break;
            case 1:
                // Load info based on module.
                characterStep = <CharacterReview characterData={this.state.characterData}/>;
                break;
            default:
                characterStep = <NotFound/>;
                break;
        }

        return (
            <div id="character-creator">
                <h1>Guided Character Creator</h1>
                <Paper>
                    <CharacterStepper currentStep={this.state.currentStep} names={steps}/>
                    <Divider/>
                    <Formsy.Form
                        className="characterCreatorForm"
                        onValidSubmit={this.submitForm.bind(this)}
                        onValid={this.enableSubmit.bind(this)}
                        onInvalid={this.disableSubmit.bind(this)}
                    >
                        <section className="formContent">{characterStep}</section>
                        <Divider/>
                        <section className="buttons">{buttons}</section>
                    </Formsy.Form>
                </Paper>
            </div>
        );
    }

    private enableSubmit() {
        this.setState({ canSubmit: true } as ICharacterCreatorState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as ICharacterCreatorState);
    }

    private previousStep() {
        this.setState({ currentStep: this.state.currentStep - 1 } as ICharacterCreatorState);
    }

    private nextStep() {
        this.setState({ currentStep: this.state.currentStep + 1 } as ICharacterCreatorState);
    }

    private submitForm(data) {
        const steps = this.getSteps();

        if (this.state.currentStep < steps.length - 1) {
            if (this.state.currentStep === 0) {
                this.setState({ characterData: data } as ICharacterCreatorState);
            }

            this.nextStep();
        } else {
            // console.info("Submit data", this.state.campaignData);
            this.setState({ canPrevious: false } as ICharacterCreatorState);
            this.disableSubmit();
        }
    }
}

export default connect()(CharacterCreator);
