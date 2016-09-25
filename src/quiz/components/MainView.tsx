import * as React from "react";

import { Quiz } from "../model";
import QuizItem from "./QuizItem";
import { connect } from "react-redux";
import { IDispatch } from "redux";

import {
    addQuiz,
    Header,
} from "../index";


interface IMainViewProps {
    quizzes: Quiz[];
    dispatch: IDispatch;
};

class MainView extends React.Component<IMainViewProps, any> {
    public render() {
        const { quizzes, dispatch } = this.props;

        return (
            <div>
                <Header addQuiz={(text: string) => dispatch(addQuiz(text))}/>
                <ul className="quiz-list">
                    {quizzes.map(quiz =>
                        <QuizItem key={quiz.id} quiz={quiz}/>
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    quizzes: state.quizzes,
});

export default connect(mapStateToProps)(MainView);
