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
    index: number;
    questions: Question[];
    dispatch: IDispatch;
};

class QuestionsContainer extends React.Component<IMainSectionProps, any> {
    public render() {
        const { questions, dispatch, index } = this.props;

        let questionsDom;

        if (questions.length === 0) {
            questionsDom = <p>This quiz has no questions.</p>;
        } else {
            questionsDom = questions.map(question =>
                <List
                    key={question.id}
                    className="question-list">
                    <QuestionItem
                        key={question.id}
                        question={question}/>
                </List>
            );
        }

        return (
            <div>
                <Header addQuestion={(index: number, text: string) => dispatch(addQuestion(index, text))}/>
                {questionsDom}
            </div>
        );
    }
}

export default connect()(QuestionsContainer);
