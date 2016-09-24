import * as React from "react";

import { Quiz } from "../model";
import QuizItem from "./QuizItem";

interface IMainSectionProps {
    quizzes: Quiz[];
};

class MainSection extends React.Component<IMainSectionProps, void> {
    public render() {
        const { quizzes } = this.props;

        return (
            <section className="main">
                <ul className="quiz-list">
                    {quizzes.map(quiz =>
                        <QuizItem key={quiz.id} quiz={quiz}/>
                    )}
                </ul>
            </section>
        );
    }
}

export default MainSection;
