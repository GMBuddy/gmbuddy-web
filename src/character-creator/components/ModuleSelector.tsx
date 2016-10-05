import * as React from "react";

import CharacterModule from "./CharacterModule";

import { Paper, Divider } from "material-ui";
import * as Formsy from "formsy-react";
import { Stepper, Step, StepLabel, RaisedButton } from "material-ui";

interface IModuleSelectorProps {
    continue: (gameType: string) => any;
}

interface IModuleSelectorState {
    gameType: string;
    canSubmit: boolean;
};

class ModuleSelector extends React.Component<IModuleSelectorProps, IModuleSelectorState> {
    constructor() {
        super();
        this.state = {
            canSubmit: false,
            gameType: null,
        } as IModuleSelectorState;
    }

    public render() {
        return (
            <Formsy.Form
                className="characterCreatorForm"
                onValidSubmit={this.submitForm.bind(this)}
                onValid={this.enableSubmit.bind(this)}
                onInvalid={this.disableSubmit.bind(this)}
            >
                <Stepper activeStep={0}>
                    <Step className="placeholderStep">
                        <StepLabel>Select Module</StepLabel>
                    </Step>
                    <Step />
                </Stepper>
                <Divider/>
                <CharacterModule gameType={this.state.gameType}/>
                <Divider/>
                <div className="characterStepButtons">
                    <RaisedButton
                        key="next"
                        className="characterCreatorNext"
                        type="submit"
                        disabled={!this.state.canSubmit}>Next</RaisedButton>
                </div>
            </Formsy.Form>
        );
    }

    private enableSubmit() {
        this.setState({ canSubmit: true } as IModuleSelectorState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as IModuleSelectorState);
    }

    private submitForm(data) {
        this.props.continue(data.gameType);
    }
}

export default ModuleSelector;
