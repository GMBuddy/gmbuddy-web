import { IDispatch } from "redux";
import { connect } from "react-redux";
import * as React from "react";

import {
    model,
    Header,
    MainSection,
    addQuestion,
} from "../../question";

interface IAppProps {
    questions: model.Question[];
    dispatch: IDispatch;
}

class App extends React.Component<IAppProps, void> {
    public render() {
        const { questions, dispatch } = this.props;

        return (
            <div className="app">
                <Header addQuestion={(text: string) => dispatch(addQuestion(text))} />
                <MainSection
                    questions={questions}/>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
