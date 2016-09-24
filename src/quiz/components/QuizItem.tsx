import * as React from "react";
import { Quiz } from "../model";
import * as Material from "material-ui";

interface IQuizItemProps {
    quiz: Quiz;
    key?: any;
}

class QuizItem extends React.Component<IQuizItemProps, {}> {
    constructor(props, context) {
        super(props, context);
    }

    public render() {
        const { quiz } = this.props;

        return (
            <Material.Card>
                <Material.CardHeader
                    title={quiz.text}
                    subtitle="This is a quiz."
                    avatar={<Material.Avatar>{quiz.text[0]}</Material.Avatar>}/>
                <Material.CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </Material.CardText>
            </Material.Card>
        );
    }
}

export default QuizItem;
