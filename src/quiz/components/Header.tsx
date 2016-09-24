import * as React from "react";

import QuizTextInput from "./QuizTextInput";

interface IHeaderProps {
    addQuiz: (text: string) => any;
};

class Header extends React.Component<IHeaderProps, void> {
    public handleSave(text: string) {
        if (text.length !== 0) {
            this.props.addQuiz(text);
        }
    }

    public render() {
        return (
            <header className="header">
                <h1>Quizzes</h1>
                <QuizTextInput
                    newQuiz
                    onSave={this.handleSave.bind(this)}
                    placeholder="Create a new quiz..." />
            </header>
        );
    }
}

export default Header;
