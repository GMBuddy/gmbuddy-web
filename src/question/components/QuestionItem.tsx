import * as React from "react";
import { Question } from "../model";

interface IQuestionItemProps {
    question: Question;
    key?: any;
}

class QuestionItem extends React.Component<IQuestionItemProps, {}> {
    constructor(props, context) {
        super(props, context);
    }

    public render() {
        return (
            <li>
                Question:
                {this.props.question}
            </li>
        );
    }
}

export default QuestionItem;
