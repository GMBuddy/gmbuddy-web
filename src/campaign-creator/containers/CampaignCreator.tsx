import * as React from "react";

import { RaisedButton } from "material-ui";

import CampaignStepper from "../components/CampaignStepper";

import CampaignDesigner from "../components/CampaignDesigner";
import CampaignReview from "../components/CampaignReview";
import CampaignInvite from "../components/CampaignInvite";
import {connect} from "react-redux";

interface ICampaignCreatorState {
    currentStep: number;
}

class CampaignCreator extends React.Component<any, ICampaignCreatorState> {
    private steps = {
        components: [
            CampaignDesigner,
            CampaignReview,
            CampaignInvite,
        ],
        names: [
            "Design Campaign",
            "Review Campaign",
            "Invite Friends",
        ],
    };

    constructor() {
        super();
        this.state = { currentStep: 0 };
    }

    public render() {
        let nextButton;

        if (this.state.currentStep < this.steps.components.length - 1) {
            nextButton = <RaisedButton onTouchTap={this.nextStep.bind(this)}>Next Step</RaisedButton>;
        } else {
            nextButton = <RaisedButton onTouchTap={this.submit.bind(this)}>Done</RaisedButton>;
        }

        return (
            <div id="campaign-creator">
                <h1>Guided Campaign Creator</h1>
                <CampaignStepper currentStep={this.state.currentStep} names={this.steps.names}/>
                {React.createElement(this.steps.components[this.state.currentStep])}
                {nextButton}
            </div>
        );
    }

    private nextStep() {
        this.setState({ currentStep: this.state.currentStep + 1 });
    }

    private submit() {
        console.log("Submit data.");
    }
}

export default connect()(CampaignCreator);
