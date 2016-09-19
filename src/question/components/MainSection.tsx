import * as React from "react";

import { Question } from "../model";

interface IMainSectionProps {
    questions: Question[];
};

class MainSection extends React.Component<IMainSectionProps, {}> {
    constructor(props, context) {
        super(props, context);
    }

    public render() {
        return (
            <section className="main">
                <ul className="question">
                </ul>
            </section>
        );
    }
}

export default MainSection;
