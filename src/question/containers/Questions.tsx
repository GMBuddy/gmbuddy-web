import * as React from "react";
import { List } from "material-ui";

import {
    addQuestion,
    Header,
} from "../index";

import QuestionItem from "../components/QuestionItem";
import { Question } from "../model";
import {IDispatch} from "redux";
import {connect} from "react-redux";

interface IMainSectionProps {
    addQuestion: (text: string) => void;
    questions: Question[];
    dispatch: IDispatch;
};

class QuestionsContainer extends React.Component<IMainSectionProps, any> {
    public render() {
        const { questions, dispatch } = this.props;

        let questionsDom;

        if(questions.length === 0) {
            questionsDom = <p>This quiz has no questions.</p>;
        } else {
            questionsDom = questions.map(question =>
                <QuestionItem
                    key={question.id}
                    question={question}/>
            );
        }

        return (
            <div>
                <Header addQuestion={(text: string) => dispatch(addQuestion(text))}/>
                <List className="question-list">
                    {questionsDom}
                </List>
            </div>
        );
    }
}

export default connect()(QuestionsContainer);
