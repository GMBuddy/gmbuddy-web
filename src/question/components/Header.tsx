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
            <header className="header">
                <h1>Questions</h1>
                <QuestionTextInput
                    newQuestion
                    onSave={this.handleSave.bind(this)}
                    placeholder="Create a new question..." />
            </header>
        );
    }
}

export default Header;
