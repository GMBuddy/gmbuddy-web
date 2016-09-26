import * as React from "react";
import { Question } from "../model";
import { ListItem } from "material-ui";

interface IQuestionItemProps {
    question: Question;
    key?: any;
}

class QuestionItem extends React.Component<IQuestionItemProps, {}> {
    public render() {
        const { question } = this.props;

        return (
            <ListItem>{question.text}</ListItem>
        );
    }
}

export default QuestionItem;
