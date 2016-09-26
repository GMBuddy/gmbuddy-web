import * as React from "react";
import { Card } from "material-ui";

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
            <Card className="quiz-input-container">
                <QuizTextInput
                    newQuiz
                    onSave={this.handleSave.bind(this)}
                    placeholder="Create a new quiz..." />
            </Card>
        );
    }
}

export default Header;
