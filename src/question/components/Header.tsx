import * as React from "react";

import QuestionTextInput from "./QuestionTextInput";

interface IHeaderProps {
    addQuestion: (id: number, quizId: number, text: string) => any;
    quizId: number;
};

class Header extends React.Component<IHeaderProps, void> {
    public handleSave(text: string) {
        console.log("save", this.props.quizId, text);
        if (text.length !== 0) {
            this.props.addQuestion(null, this.props.quizId, text);
        }
    }

    public render() {
        return (
            <QuestionTextInput
                quizId={this.props.quizId}
                onSave={this.handleSave.bind(this)}
                placeholder="Create a new question..." />
        );
    }
}

export default Header;
