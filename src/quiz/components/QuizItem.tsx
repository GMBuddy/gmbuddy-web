import * as React from "react";
import { Quiz } from "../model";
import { Card, CardHeader, CardActions, FlatButton, Avatar, CardText, Divider } from "material-ui";
import Questions from "../../question/containers/Questions";
import { Question } from "../../question/model";

interface IQuizItemProps {
    quiz: Quiz;
    questions: Question[];
    key?: any;
}

class QuizItem extends React.Component<IQuizItemProps, {}> {
    public render() {
        const { quiz, questions } = this.props;

        return (
            <Card>
                <CardHeader
                    title={quiz.text}
                    subtitle={`There are ${questions.length} questions in this quiz.`}
                    avatar={<Avatar>{quiz.text[0] || ""}</Avatar>}
                    />
                <Divider />
                <CardText>
                    <Questions key={quiz.id} quizId={quiz.id} questions={questions}/>
                </CardText>
                <Divider />
                <CardActions>
                    <FlatButton label="Delete" />
                    <FlatButton label="View" />
                </CardActions>
            </Card>
        );
    }
}

export default QuizItem;
