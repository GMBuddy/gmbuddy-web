import * as React from "react";
import ModuleSelector from "../components/ModuleSelector";
import { Paper } from "material-ui";
import DnD35CharacterCreator from "./DnD35CharacterCreator";
import NotFoundCharacterCreator from "./NotFoundCharacterCreator";
import Micro20CharacterCreator from "./Micro20CharacterCreator";

interface ICharacterCreatorState {
    canSubmit: boolean;
    gameType: string;
    step: number;
};

class CharacterCreator extends React.Component<void, ICharacterCreatorState> {
    constructor() {
        super();
        this.state = {
            canSubmit: false,
            gameType: null,
            step: 0,
        } as ICharacterCreatorState;
    }

    public render() {
        let currentCreator = <ModuleSelector continue={ this.selectModule.bind(this) }/>;

        if (this.state.step > 0) {
            switch (this.state.gameType) {
                case "dnd35":
                    currentCreator = <DnD35CharacterCreator
                                        step={this.state.step}
                                        nextStep={this.nextStep.bind(this)}
                                        previousStep={this.previousStep.bind(this)}/>;
                    break;
                case "micro20":
                    currentCreator = <Micro20CharacterCreator
                        step={this.state.step}
                        nextStep={this.nextStep.bind(this)}
                        previousStep={this.previousStep.bind(this)}/>;
                    break;
                default:
                    currentCreator = <NotFoundCharacterCreator previousStep={this.previousStep.bind(this)}/>;
                    break;
            }
        }

        return (
            <div>
                <h1>Guided Character Creator</h1>
                <Paper>
                    {currentCreator}
                </Paper>
            </div>
        );
    }

    private selectModule(gameType: string) {
        this.setState({ gameType: gameType } as ICharacterCreatorState);
        this.nextStep();
    }

    private nextStep() {
        this.setState({ step: this.state.step + 1 } as ICharacterCreatorState);
    }

    private previousStep() {
        this.setState({ step: this.state.step - 1 } as ICharacterCreatorState);
    }
}

export default CharacterCreator;
