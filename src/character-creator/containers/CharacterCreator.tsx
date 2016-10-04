import * as React from "react";

import CharacterStepper from "../components/CharacterStepper";
import CharacterModule from "../components/CharacterModule";

import CharacterDetailsDnd35 from "../dnd35/components/CharacterDetails";
import CharacterStatsDnd35 from "../dnd35/components/CharacterStats";
import CharacterReviewDnd35 from "../dnd35/components/CharacterReview";

import { RaisedButton, Paper, Divider } from "material-ui";
import * as Formsy from "formsy-react";

import NotFound from "../../layout/components/NotFound";
import {connect} from "react-redux";

interface ICharacterCreatorState {
    gameType: string;
    data: any;
    canPrevious: boolean;
    canSubmit: boolean;
    currentStep: number;
}

class CharacterCreator extends React.Component<void, ICharacterCreatorState> {
    private getSteps() {
        switch (this.state.gameType) {
            case "dnd35":
                return ["Module", "Details", "Stats", "Skills", "Spells", "Items","Review"]
            case "dnd5":
                return ["Module", "D&D 5e Stuff", "Misc.", "Review"]
            default:
                return ["Module", "...", "Review"]
        }
    }

    private currentComponent() {
        switch (this.state.gameType) {
            case "dnd35":
                switch (this.state.currentStep) {
                    case 0:
                        return <CharacterModule gameType={this.state.gameType}/>;
                    case 1:
                        return <CharacterDetailsDnd35 details={this.state.data.details}/>;
                    case 2:
                        return <CharacterStatsDnd35 stats={this.state.data.stats}/>;
                    case 6:
                        return <CharacterReviewDnd35 gameType={this.state.gameType} data={this.state.data}/>;
                    default:
                        return <NotFound/>;
                }
            default:
                switch (this.state.currentStep) {
                    case 0:
                        return <CharacterModule gameType={this.state.gameType}/>;
                    default:
                        return <NotFound/>;
                }
        }
    }

    constructor() {
        super();
        this.state = {
            data: { details: {}, stats: {}},
            gameType: null,
            canPrevious: true,
            canSubmit: false,
            currentStep: 0,
        } as ICharacterCreatorState;
    }

    public render() {
        const steps = this.getSteps();
        let buttons = [];

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
                        <section className="formContent">{this.currentComponent()}</section>
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
                this.setState({ gameType: data.gameType } as ICharacterCreatorState);
            } else {
                this.setState({data: Object.assign(this.state.data, data)} as ICharacterCreatorState);
            }

            this.nextStep();
        } else {
            this.setState({ canPrevious: false } as ICharacterCreatorState);
            this.disableSubmit();
        }
    }
}

export default CharacterCreator;
