import * as React from "react";
import { Quiz } from "../model";
import { Card, CardHeader, CardActions, FlatButton } from "material-ui";
import Question from "../../question/components/MainSection";


interface IQuizItemProps {
    quiz: Quiz;
    key?: any;
}

class QuizItem extends React.Component<IQuizItemProps, {}> {
    public render() {
        const { quiz } = this.props;

        return (
            <Card>
                <CardHeader
                    title={quiz.text}
                    subtitle={`There are ${quiz.questions.length} questions inside of this quiz.`}
                    />
                <Question
                    questions={quiz.questions}/>
                <CardActions>
                    <FlatButton label="Delete" />
                    <FlatButton label="View" />
                </CardActions>
            </Card>
        );
    }
}

export default QuizItem;
