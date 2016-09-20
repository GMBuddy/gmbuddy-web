import * as React from "react";

import { Question } from "../model";
import QuestionItem from "./QuestionItem";

interface IMainSectionProps {
    questions: Question[];
};

class MainSection extends React.Component<IMainSectionProps, void> {
    public render() {
        const { questions } = this.props;

        return (
            <section className="main">
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
