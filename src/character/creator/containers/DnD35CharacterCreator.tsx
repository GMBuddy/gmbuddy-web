import * as React from "react";
import CharacterStepContainer from "../components/CharacterStepContainer";
import CharacterStepper from "../components/CharacterStepper";
import CharacterStepButtons from "../components/CharacterStepButtons";
import CharacterDetailsDnd35 from "../components/dnd35/CharacterDetails";
import CharacterItems from "../components/shared/CharacterItems";
import CharacterReviewDnd35 from "../components/dnd35/CharacterReview";
import { Divider } from "material-ui";
import * as Formsy from "formsy-react";
import CharacterStats from "../components/shared/CharacterStats";
import { STATS } from "../../constants/dnd35";
import { merge } from "lodash";
import { browserHistory } from "react-router";
import { createCharacter } from "../../actions/create/thunks";
import {connect} from "react-redux";

interface IDnD35CharacterCreatorProps {
    dispatch: any;
    step: number;
    previousStep: () => any;
    nextStep: () => any;
}

interface IDnD35CharacterCreatorState {
    canPrevious: boolean;
    canSubmit: boolean;
    data: any;
    createError: string;
}

class DnD35CharacterCreator extends React.Component<IDnD35CharacterCreatorProps, IDnD35CharacterCreatorState> {
    constructor() {
        super();
        this.state = {
            canPrevious: true,
            canSubmit: false,
            data: { details: {},  items: [], stats: {}},
        } as IDnD35CharacterCreatorState;
    }

    public render() {
        /* tslint:disable */
        let steps = {
            Details: <CharacterDetailsDnd35
                key="details"
                details={this.state.data.details} />,
            Stats: <CharacterStats
                names={STATS}
                key="stats"
                stats={this.state.data.stats} />,
            Items: <CharacterItems
                key="items"
                items={this.state.data.items} />,
            Review: <CharacterReviewDnd35
                error={this.state.createError}
                key="review"
                data={this.state.data} />,
        };
        /* tslint:enable */

        let stepWords = Object.keys(steps).map((key) => key);
        let stepsDom = Object.keys(steps).map((key) => steps[key]);

        const numSteps = stepsDom.length + 1;

        return (
            <div className="dnd35CharacterCreator">
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
            this.setState({ canPrevious: false } as IDnD35CharacterCreatorState);
            this.disableSubmit();

            this.props.dispatch(createCharacter(merge({gameType: "dnd35"}, this.state.data),
                (id) => {
                    browserHistory.push(`/dnd35/characters/${id}`);
                    this.enableSubmit();
                },
                (error) => {
                    this.setState({
                        canPrevious: true, canSubmit: true, createError: error,
                    } as IDnD35CharacterCreatorState);
                }));
        }
    }
}

export default connect()(DnD35CharacterCreator);
