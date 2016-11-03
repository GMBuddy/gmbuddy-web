import * as React from "react";
import CharacterStepContainer from "../components/CharacterStepContainer";
import CharacterStepper from "../components/CharacterStepper";
import CharacterStepButtons from "../components/CharacterStepButtons";
import { Divider } from "material-ui";
import NotFound from "../../../layout/components/NotFound";

interface INotFoundCharacterCreatorProps {
    previousStep: () => any;
}

interface INotFoundCharacterCreatorState {
    canPrevious: boolean;
    canSubmit: boolean;
    dnd35data: any;
    data: any;
}

class NotFoundCharacterCreator extends React.Component<INotFoundCharacterCreatorProps, INotFoundCharacterCreatorState> {
    constructor() {
        super();
        this.state = {
            canPrevious: true,
            canSubmit: false,
            data: { details: {}, stats: {}},
        } as INotFoundCharacterCreatorState;
    }

    public render() {
        let steps = {
            "Not Found": <NotFound key="not-found"/>,
        };

        let stepWords = Object.keys(steps).map((key) => key);
        let stepsDom = Object.keys(steps).map((key) => steps[key]);

        return (
            <div>
                <CharacterStepper currentStep={1} names={["Select Module", ...stepWords]}/>
                <Divider/>
                <CharacterStepContainer className="characterStepContainer" step={0}>
                    {stepsDom}
                </CharacterStepContainer>
                <Divider/>
                <CharacterStepButtons
                    step={1}
                    numberSteps={2}
                    canNext={false}
                    canPrevious={true}
                    previousStep={this.previousStep.bind(this)}
                />
            </div>
        );
    }

    private previousStep() {
        this.props.previousStep();
    }
}

export default NotFoundCharacterCreator;
