import * as React from "react";

import CharacterStepContainer from "../components/CharacterStepContainer";
import CharacterStepper from "../components/CharacterStepper";
import CharacterModule from "../components/CharacterModule";

import CharacterDetailsDnd35 from "../dnd35/components/CharacterDetails";
import CharacterStatsDnd35 from "../dnd35/components/CharacterStats";
import CharacterReviewDnd35 from "../dnd35/components/CharacterReview";
import CharacterStepButtons from "../components/CharacterStepButtons";

import { Paper, Divider } from "material-ui";
import * as Formsy from "formsy-react";
import NotFound from "../../layout/components/NotFound";

interface ICharacterCreatorState {
    canPrevious: boolean;
    canSubmit: boolean;
    currentStep: number;
    data: any;
    gameType: string;
}

class CharacterCreator extends React.Component<void, ICharacterCreatorState> {
    constructor() {
        super();
        this.state = {
            canPrevious: true,
            canSubmit: false,
            currentStep: 0,
            data: { details: {}, stats: {}},
            gameType: null,
        } as ICharacterCreatorState;
    }

    public render() {
        let stepWords = [];
        let stepsDom = [];
        let validSteps = true;

        if (this.state.currentStep !== 0) {
            let steps:Object;

            switch (this.state.gameType) {
                case "dnd35":
                    steps = {
                                Details: <CharacterDetailsDnd35
                                            key="details"
                                            details={this.state.data.details} />,
                                Stats: <CharacterStatsDnd35
                                            key="stats"
                                            stats={this.state.data.stats} />,
                                Review: <CharacterReviewDnd35
                                            key="review"
                                            gameType={this.state.gameType}
                                            data={this.state.data} />,
                            }
                    break;
                default:
                    steps = {  "Error": <NotFound key="error" /> }
                    validSteps = false;
                    break;
            }

            stepWords = Object.keys(steps).map((key) => key);
            stepsDom = Object.keys(steps).map((key) => steps[key]);
        }

        const numSteps = stepsDom.length + 1;

        return (
            <div id="character-creator">
                <h1>Guided Character Creator</h1>
                <Paper>
                    <CharacterStepper currentStep={this.state.currentStep} names={["Select Module", ...stepWords]}/>
                    <Divider/>
                    <Formsy.Form
                        className="characterCreatorForm"
                        onValidSubmit={this.submitForm.bind(this, numSteps)}
                        onValid={this.enableSubmit.bind(this)}
                        onInvalid={this.disableSubmit.bind(this)}
                    >
                        <CharacterStepContainer className="characterStepContainer" step={this.state.currentStep}>
                            <CharacterModule gameType={this.state.gameType}/>
                            {stepsDom}
                        </CharacterStepContainer>
                        <Divider/>
                        <CharacterStepButtons
                            step={this.state.currentStep}
                            numberSteps={numSteps}
                            canNext={validSteps && this.state.canSubmit}
                            canPrevious={this.state.canPrevious}
                            previousStep={this.previousStep.bind(this)}
                        />
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

    private submitForm(numSteps:number, data) {
        if (this.state.currentStep === 0 || this.state.currentStep < numSteps - 1) {
            if (this.state.currentStep === 0) {
                this.setState({ gameType: data.gameType } as ICharacterCreatorState);
            } else {
                // console.log(data, this.state.data, Object.assign(this.state.data, data));
                this.setState({data: Object.assign(this.state.data, data)} as ICharacterCreatorState);
            }

            this.nextStep();
        } else {
            // console.info("Submit data:", this.state.gameType, this.state.data);
            this.setState({ canPrevious: false } as ICharacterCreatorState);
            this.disableSubmit();
        }
    }
}

export default CharacterCreator;
