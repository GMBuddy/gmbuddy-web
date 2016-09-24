import { IDispatch } from "redux";
import { connect } from "react-redux";
import * as React from "react";

import {
    model,
    Header,
    MainSection,
    addQuiz,
} from "../../quiz";

interface IAppProps {
    quizzes: model.Quiz[];
    dispatch: IDispatch;
}

class App extends React.Component<IAppProps, void> {
    public render() {
        const { quizzes, dispatch } = this.props;

        return (
            <div className="app">
                <Header addQuiz={(text: string) => dispatch(addQuiz(text))} />
                <MainSection quizzes={quizzes}/>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
