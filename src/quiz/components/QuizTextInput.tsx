import * as React from "react";
import * as classNames from "classnames";
import { TextField } from "material-ui";

interface IQuizTextInputProps {
    onSave: (text: string) => void;
    text?: string;
    placeholder?: string;
    newQuiz?: boolean;
}

interface IQuizTextInputState {
    text: string;
}

class QuizTextInput extends React.Component<IQuizTextInputProps, IQuizTextInputState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.text || "",
        };
    }

    public handleChange(e) {
        this.setState({ text: e.target.value });
    }

    public handleSubmit(e) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
            if (this.props.newQuiz) {
                this.setState({ text: "" });
            }
        }
    }

    public render() {
        return (
            <TextField className={
                classNames({
                  "new-quiz": this.props.newQuiz,
            })}
               type="text"
               placeholder={this.props.placeholder}
               value={this.state.text}
               onChange={this.handleChange.bind(this)}
               onKeyDown={this.handleSubmit.bind(this)} />
        );
    }
}

export default QuizTextInput;
