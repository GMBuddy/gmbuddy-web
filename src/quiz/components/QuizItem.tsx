import * as React from "react";
import { Quiz } from "../model";
import { Card, CardHeader, CardActions, FlatButton, Avatar, CardText, Divider } from "material-ui";
import Questions from "../../question/containers/Questions";

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
                    avatar={<Avatar>{quiz.text[0] || ""}</Avatar>}
                    />
                <Divider />
                <CardText>
                    <Questions
                        key={quiz.id}
                        index={quiz.id}
                        questions={quiz.questions}/>
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
