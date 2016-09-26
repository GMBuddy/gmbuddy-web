import * as React from "react";
import * as classNames from "classnames";
import { TextField } from "material-ui";

interface IQuestionTextInputProps {
    onSave: (text: string) => void;
    text?: string;
    placeholder?: string;
    newQuestion?: boolean;
}

interface IQuestionTextInputState {
    text: string;
}

class QuestionTextInput extends React.Component<IQuestionTextInputProps, IQuestionTextInputState> {
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
            if (this.props.newQuestion) {
                this.setState({ text: "" });
            }
        }
    }

    public render() {
        return (
            <TextField className={
        classNames({
          "new-question": this.props.newQuestion,
        })}
                   type="text"
                   placeholder={this.props.placeholder}
                   value={this.state.text}
                   onChange={this.handleChange.bind(this)}
                   onKeyDown={this.handleSubmit.bind(this)} />
        );
    }
}

export default QuestionTextInput;
