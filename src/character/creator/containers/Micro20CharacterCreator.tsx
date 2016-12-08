import * as React from "react";
import CharacterStepContainer from "../components/CharacterStepContainer";
import CharacterStepper from "../components/CharacterStepper";
import CharacterStepButtons from "../components/CharacterStepButtons";
import CharacterDetails from "../components/micro20/CharacterDetails";
import CharacterSkills from "../components/micro20/CharacterSkills";
import CharacterSpells from "../components/micro20/CharacterSpells";
import CharacterReview from "../components/micro20/CharacterReview";
import { Divider } from "material-ui";
import * as Formsy from "formsy-react";
import CharacterStats from "../components/shared/CharacterStats";
import { STATS, SKILLS } from "../../constants/micro20";
import { createCharacter} from "../../actions/create/thunks";
import {connect} from "react-redux";
import { merge } from "lodash";
import { browserHistory } from "react-router";

interface IMicro20CharacterCreatorProps {
    dispatch: any;
    step: number;
    previousStep: () => any;
    nextStep: () => any;
}

interface IMicro20CharacterCreatorState {
    canPrevious: boolean;
    canSubmit: boolean;
    data: any;
    createError: string;
}

class Micro20CharacterCreator extends React.Component<IMicro20CharacterCreatorProps, IMicro20CharacterCreatorState> {
    constructor() {
        super();
        let baseSkills = {};
        SKILLS.map((skill) => {
           baseSkills[skill] = {};
        });
        this.state = {
            canPrevious: true,
            canSubmit: false,
            data: { baseStats: {}, createError: null, details: {}, skills: baseSkills, spells: {}},
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
                stats={this.state.data.baseStats} />,
            Skills: <CharacterSkills
                key="skills"
                details={this.state.data.details}
                skills={this.state.data.skills} />,
            Spells: <CharacterSpells
                key="spells"
                details={this.state.data.details}
                spells={this.state.data.spells} />,
            Review: <CharacterReview 
                error={this.state.createError}
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
            this.props.dispatch(createCharacter(merge({gameType: "micro20"}, this.state.data),
                (id) => {
                    browserHistory.push(`/micro20/characters/${id}`);
                    this.enableSubmit();
                },
                (error) => {
                    this.setState({ canPrevious: true, createError: error } as IMicro20CharacterCreatorState);
                    this.enableSubmit();
                }));
            this.setState({ canPrevious: false } as IMicro20CharacterCreatorState);
            this.disableSubmit();
        }
    }
}

export default connect()(Micro20CharacterCreator);
