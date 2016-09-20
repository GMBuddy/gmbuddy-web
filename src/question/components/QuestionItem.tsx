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
        const { question } = this.props;

        return (
            <li>
                {question.text}
            </li>
        );
    }
}

export default QuestionItem;
