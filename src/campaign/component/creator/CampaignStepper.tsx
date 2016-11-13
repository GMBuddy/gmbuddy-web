import * as React from "react";

import { Step, Stepper, StepLabel } from "material-ui/Stepper";

interface ICampaignStepperProps {
    currentStep: number;
    names: string[];
}

class CampaignStepper extends React.Component<ICampaignStepperProps, any> {
    public render() {
        const { currentStep, names } = this.props;

        return (
            <Stepper activeStep={currentStep}>
                {names.map((name, index) =>
                    <Step key={index}>
                        <StepLabel>{name}</StepLabel>
                    </Step>
                )}
            </Stepper>
        );
    }
}

export default CampaignStepper;
