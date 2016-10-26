import * as React from "react";

import CampaignStepper from "../components/CampaignStepper";

import CampaignDesigner from "../components/CampaignDesigner";
import CampaignReview from "../components/CampaignReview";

import { RaisedButton, Paper, Divider } from "material-ui";
import * as Formsy from "formsy-react";

import NotFound from "../../layout/components/NotFound";

import { createCampaign } from "../actions/thunks";
import { IDispatch } from "~redux-thunk~redux";
import { connect } from "react-redux";
import CampaignInvite from "../components/CampaignInvite";

export interface ICampaignData {
    gameType: string;
    title: string;
}

interface ICampaignCreatorProps {
    dispatch: IDispatch;
}

interface ICampaignCreatorState {
    campaignData: ICampaignData;
    canPrevious: boolean;
    canSubmit: boolean;
    currentStep: number;
    error: string;
}

class CampaignCreator extends React.Component<ICampaignCreatorProps, ICampaignCreatorState> {
    private  steps = [
            "Design Campaign",
            "Review Campaign",
            "Invite Friends",
        ];

    constructor() {
        super();
        this.state = {
            campaignData: { gameType: null },
            canPrevious: true,
            canSubmit: false,
            currentStep: 0,
        } as ICampaignCreatorState;
    }

    public render() {
        let buttons = [];
        let campaignStep;

        if (this.state.currentStep > 0) {
            buttons.push(<RaisedButton
                key="prev"
                className="campaignCreatorPrevious"
                onTouchTap={this.previousStep.bind(this)}
                disabled={!this.state.canPrevious}>Previous</RaisedButton>);
        }

        if (this.state.currentStep === 0) {
            buttons.push(<RaisedButton
                            key="next"
                            className="campaignCreatorNext"
                            type="submit"
                            disabled={!this.state.canSubmit}>Next</RaisedButton>);
        } else {
            buttons.push(<RaisedButton
                            key="done"
                            className="campaignCreatorSubmit"
                            type="submit"
                            primary={true}
                            disabled={!this.state.canSubmit}
                >
                    {(this.state.currentStep === 2 ? "Invite" : "Done")}
                </RaisedButton>);
        }

        switch (this.state.currentStep) {
            case 0:
                campaignStep = <CampaignDesigner campaignData={this.state.campaignData}/>;
                break;
            case 1:
                campaignStep = <CampaignReview campaignData={this.state.campaignData}/>;
                break;
            case 2:
                campaignStep = <CampaignInvite />;
                break;
            default:
                campaignStep = <NotFound/>;
                break;
        }

        const errorMessage = () => {
            if (!this.state.error) {
                return null;
            }

            return <p style={{color: "red"}}>ERROR: {this.state.error}</p>;
        };

        return (
            <div id="campaign-creator">
                <h1>Guided Campaign Creator</h1>
                <Paper>
                    <CampaignStepper currentStep={this.state.currentStep} names={this.steps}/>
                    <Divider/>
                    <Formsy.Form
                        className="campaignCreatorForm"
                        onValidSubmit={this.submitForm.bind(this)}
                        onValid={this.enableSubmit.bind(this)}
                        onInvalid={this.disableSubmit.bind(this)}
                    >
                        {errorMessage()}
                        <section className="formContent">{campaignStep}</section>
                        <Divider/>
                        <section className="buttons">{buttons}</section>
                    </Formsy.Form>
                </Paper>
            </div>
        );
    }

    private enableSubmit() {
        this.setState({ canSubmit: true } as ICampaignCreatorState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as ICampaignCreatorState);
    }

    private previousStep() {
        this.setState({ currentStep: this.state.currentStep - 1 } as ICampaignCreatorState);
    }

    private nextStep() {
        this.setState({ currentStep: this.state.currentStep + 1 } as ICampaignCreatorState);
    }

    private submitForm(data) {
        this.setState({ error: null } as ICampaignCreatorState);

        switch (this.state.currentStep) {
            case 0:
                this.setState({ campaignData: data } as ICampaignCreatorState);
                this.nextStep();
                break;
            case 1:
                this.setState({ canPrevious: false } as ICampaignCreatorState);
                this.disableSubmit();

                this.props.dispatch(createCampaign(this.state.campaignData,
                    () => this.nextStep(),
                    (error) => {
                        this.setState({ error } as ICampaignCreatorState);
                        this.enableSubmit();
                    })
                );
                break;
            case 2:
                // And here is where I'd invite my friends... IF I HAD ANY!
                break;
            default: break;
        }
    }
}

export default connect()(CampaignCreator);
