import * as React from "react";
import { RaisedButton } from "material-ui";

interface ICharacterStepContainer {
    step: number;
    numberSteps: number;
    canPrevious: boolean;
    previousStep: () => any;
    canNext: boolean;
}

class CharacterStepButtons extends React.Component<ICharacterStepContainer, any> {
    public render() {
        let buttons = [];

        if (this.props.step > 0) {
            buttons.push(<RaisedButton
                key="prev"
                className="characterCreatorPrevious"
                onTouchTap={this.props.previousStep.bind(this)}
                disabled={!this.props.canPrevious}>Previous</RaisedButton>);
        }

        if (this.props.step === 0 || this.props.step < this.props.numberSteps - 1) {
            buttons.push(<RaisedButton
                key="next"
                className="characterCreatorNext"
                type="submit"
                disabled={!this.props.canNext}>Next</RaisedButton>);
        } else {
            buttons.push(<RaisedButton
                key="done"
                className="characterCreatorSubmit"
                type="submit"
                primary={true}
                disabled={!this.props.canNext}>Done</RaisedButton>);
        }
        return (
            <div className="characterStepButtons">
                {buttons.map((b) => b)}
            </div>
        );
    }

}

export default CharacterStepButtons;
