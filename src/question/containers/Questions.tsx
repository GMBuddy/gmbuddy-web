import * as React from "react";
import { List } from "material-ui";

import {
    addQuestion,
    Header,
} from "../index";

import QuestionItem from "../components/QuestionItem";
import { Question } from "../model";
import { IDispatch } from "redux";
import { connect } from "react-redux";

interface IQuestionsContainerProps {
    addQuestion: (quizId: number, text: string) => void;
    questions: Question[];
    quizId: number;
    dispatch: IDispatch;
};

interface IQuestionsContainerState {
    quizId: number;
}

class QuestionsContainer extends React.Component<IQuestionsContainerProps, IQuestionsContainerState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            quizId: this.props.quizId,
        };
    }

    public render() {
        const { questions = [], dispatch, quizId } = this.props;

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
                <Header quizId={quizId}
                    addQuestion={(index: number, qId: number, text: string) =>
                        dispatch(addQuestion(index, qId, text))}/>
                {questionsDom}
            </div>
        );
    }
}

export default connect()(QuestionsContainer);
