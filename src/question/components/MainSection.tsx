import * as React from "react";

import { Question } from "../model";
import QuestionItem from "./QuestionItem";
import Header from "./Header";
import {addQuestion} from "../actions";
import {IDispatch} from "redux";

interface IMainSectionProps {
    questions: Question[];
    dispatch: IDispatch;
};

class MainSection extends React.Component<IMainSectionProps, any> {
    public render() {
        const { questions, dispatch } = this.props;

        return (
            <section className="main">
                <p>{questions.length} Questions</p>
                <Header addQuestion={(text: string) => dispatch(addQuestion(text))}/>
                <ul className="question-list">
                    {questions.map(question =>
                        <QuestionItem key={question.id} question={question}/>
                    )}
                </ul>
            </section>
        );
    }
}

export default MainSection;
