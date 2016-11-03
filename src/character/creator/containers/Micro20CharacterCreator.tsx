import * as React from "react";
import CharacterStepContainer from "../components/CharacterStepContainer";
import CharacterStepper from "../components/CharacterStepper";
import CharacterStepButtons from "../components/CharacterStepButtons";
import CharacterDetails from "../components/micro20/CharacterDetails";
import CharacterReview from "../components/micro20/CharacterReview";
import { Divider } from "material-ui";
import * as Formsy from "formsy-react";
import CharacterStats from "../components/shared/CharacterStats";
import { STATS } from "../../constants/micro20";

interface IMicro20CharacterCreatorProps {
    step: number;
    previousStep: () => any;
    nextStep: () => any;
}

interface IMicro20CharacterCreatorState {
    canPrevious: boolean;
    canSubmit: boolean;
    data: any;
}

class Micro20CharacterCreator extends React.Component<IMicro20CharacterCreatorProps, IMicro20CharacterCreatorState> {
    constructor() {
        super();
        this.state = {
            canPrevious: true,
            canSubmit: false,
            data: { details: {},  items: [], stats: {}},
        } as IMicro20CharacterCreatorState;
    }

    public render() {
        /* tslint:disable */
        let steps = {
            Details: <CharacterDetails
                key="details"
                details={this.state.data.details} />,
            Stats: <CharacterStats
                key="stats"
                names={STATS}
                stats={this.state.data.stats} />,
            Review: <CharacterReview
                key="review"
                data={this.state.data} />,
        };
        /* tslint:enable */

        let stepWords = Object.keys(steps).map((key) => key);
        let stepsDom = Object.keys(steps).map((key) => steps[key]);

        const numSteps = stepsDom.length + 1;

        return (
            <div className="micro20CharacterCreator">
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
        this.setState({ canSubmit: true } as IMicro20CharacterCreatorState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as IMicro20CharacterCreatorState);
    }

    private previousStep() {
        this.props.previousStep();
    }

    private nextStep() {
        this.props.nextStep();
    }

    private submitForm(numSteps: number, data) {
        if (this.props.step === 0 || this.props.step < numSteps - 1) {
            this.setState({data: Object.assign(this.state.data, data)} as IMicro20CharacterCreatorState);
            this.nextStep();
        } else {
            // console.info("Submit Micro20 data:", this.state.data);
            this.setState({ canPrevious: false } as IMicro20CharacterCreatorState);
            this.disableSubmit();
        }
    }
}

export default Micro20CharacterCreator;
