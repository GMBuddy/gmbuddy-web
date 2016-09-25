import * as React from "react";

import QuestionTextInput from "./QuestionTextInput";

interface IHeaderProps {
    addQuestion: (text: string) => any;
};

class Header extends React.Component<IHeaderProps, void> {
    public handleSave(text: string) {
        if (text.length !== 0) {
            this.props.addQuestion(text);
        }
    }

    public render() {
        return (
            <QuestionTextInput
                newQuestion
                onSave={this.handleSave.bind(this)}
                placeholder="Create a new question..." />
        );
    }
}

export default Header;
