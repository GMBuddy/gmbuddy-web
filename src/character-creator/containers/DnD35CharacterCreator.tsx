import * as React from "react";

import CharacterStepContainer from "../components/CharacterStepContainer";
import CharacterStepper from "../components/CharacterStepper";
import CharacterStepButtons from "../components/CharacterStepButtons";

import CharacterDetailsDnd35 from "../dnd35/components/CharacterDetails";
import CharacterStatsDnd35 from "../dnd35/components/CharacterStats";
import CharacterItemsDnd35 from "../dnd35/components/CharacterItems";
import CharacterReviewDnd35 from "../dnd35/components/CharacterReview";

import { Divider } from "material-ui";
import * as Formsy from "formsy-react";

interface IDnD35CharacterCreatorProps {
    step: number;
    previousStep: () => any;
    nextStep: () => any;
}

interface IDnD35CharacterCreatorState {
    canPrevious: boolean;
    canSubmit: boolean;
    dnd35data: any;
    data: any;
}

class DnD35CharacterCreator extends React.Component<IDnD35CharacterCreatorProps, IDnD35CharacterCreatorState> {
    constructor() {
        super();
        this.state = {
            canPrevious: true,
            canSubmit: false,
            data: { details: {}, stats: {}, items: []},
        } as IDnD35CharacterCreatorState;
    }

    public render() {
        /* tslint:disable */
        let steps = {
            Details: <CharacterDetailsDnd35
                key="details"
                details={this.state.data.details} />,
            Stats: <CharacterStatsDnd35
                key="stats"
                stats={this.state.data.stats} />,
            Items: <CharacterItemsDnd35
                key="stats"
                items={this.state.data.items} />,
            Review: <CharacterReviewDnd35
                key="review"
                data={this.state.data} />,
        };
        /* tslint:enable */

        let stepWords = Object.keys(steps).map((key) => key);
        let stepsDom = Object.keys(steps).map((key) => steps[key]);

        const numSteps = stepsDom.length + 1;

        return (
            <div>
                <CharacterStepper currentStep={this.props.step} names={["Select Module", ...stepWords]}/>
                <Divider/>
                <Formsy.Form
                    className="characterCreatorForm"
                    onValidSubmit={this.submitForm.bind(this, numSteps)}
                    onValid={this.enableSubmit.bind(this)}
                    onInvalid={this.disableSubmit.bind(this)}
                >
                    <CharacterStepContainer className="characterStepContainer" step={this.props.step - 1}>
                        {stepsDom}
                    </CharacterStepContainer>
                    <Divider/>
                    <CharacterStepButtons
                        step={this.props.step}
                        numberSteps={numSteps}
                        canNext={this.state.canSubmit}
                        canPrevious={this.state.canPrevious}
                        previousStep={this.previousStep.bind(this)}
                    />
                </Formsy.Form>
            </div>
        );
    }

    private enableSubmit() {
        this.setState({ canSubmit: true } as IDnD35CharacterCreatorState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as IDnD35CharacterCreatorState);
    }

    private previousStep() {
        this.props.previousStep();
    }

    private nextStep() {
        this.props.nextStep();
    }

    private submitForm(numSteps: number, data) {
        if (this.props.step === 0 || this.props.step < numSteps - 1) {
            this.setState({data: Object.assign(this.state.data, data)} as IDnD35CharacterCreatorState);
            this.nextStep();
        } else {
            // console.info("Submit D&D 3.5 data:", this.state.data);
            this.setState({ canPrevious: false } as IDnD35CharacterCreatorState);
            this.disableSubmit();
        }
    }
}

export default DnD35CharacterCreator;
