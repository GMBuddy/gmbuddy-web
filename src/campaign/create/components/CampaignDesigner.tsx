import * as React from "react";
import { FormsySelect, FormsyText } from "formsy-material-ui/lib";
import { MenuItem } from "material-ui";
import { ICampaignData } from "gmbuddy/campaign";

interface ICampaignDesignerProps {
    campaignData: ICampaignData;
}

class CampaignDesigner extends React.Component<ICampaignDesignerProps, any> {
    public render() {
        const { name, gameType } = this.props.campaignData;

        return (
            <section className="campaignDesigner">
                <FormsyText
                    name="name"
                    floatingLabelText="Campaign Name"
                    required
                    value={name}
                />
                <FormsySelect
                    required
                    className="gameTypeSelector"
                    defaultValue={gameType}
                    floatingLabelText="Campaign Game Type"
                    hintText="Select a game type."
                    name="gameType"
                    value={gameType}
                    validations="isExisty"
                >
                    <MenuItem primaryText=" "/>
                    <MenuItem value="dnd35" label="Dungeons & Dragons v3.5" primaryText="D&D 3.5 (UNSUPPORTED)" />
                    <MenuItem value="micro20" label="Microlite20" primaryText="Microlite20" />
                </FormsySelect>
            </section>
        );
    }
}

export default CampaignDesigner;
