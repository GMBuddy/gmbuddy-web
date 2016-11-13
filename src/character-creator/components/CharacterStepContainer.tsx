import * as React from "react";

interface ICharacterStepContainer {
    step: number;
}

class CharacterStepContainer extends React.Component<ICharacterStepContainer, any> {
    public render() {
        const children = React.Children.toArray(this.props.children);

        return (
            <section className="currentStep">
                {children[this.props.step]}
            </section>
        );
    }

}

export default CharacterStepContainer;
