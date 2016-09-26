import * as React from "react";

import { connect } from "react-redux";
import { IDispatch } from "redux";

import {
    addQuiz,
    Header,
} from "../index";

import QuizItem from "../components/QuizItem";
import { Quiz } from "../model";

interface IMainViewProps {
    quizzes: Quiz[];
    dispatch: IDispatch;
};

class Quizzes extends React.Component<IMainViewProps, any> {
    public render() {
        const { quizzes, dispatch } = this.props;

        return (
            <div>
                <Header addQuiz={(text: string) => dispatch(addQuiz(text))}/>
                <ul className="quiz-list">
                    {quizzes.map(quiz =>
                        <QuizItem
                            key={quiz.id}
                            quiz={quiz}/>
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    quizzes: state.quizzes,
});

export default connect(mapStateToProps)(Quizzes);
