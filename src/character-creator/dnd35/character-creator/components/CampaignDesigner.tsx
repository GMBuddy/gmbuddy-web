import * as React from "react";
import { FormsySelect, FormsyText } from "formsy-material-ui/lib";
import { MenuItem, Divider } from "material-ui";

export interface ICampaignData {
    gameType: string;
    title: string;
}

interface ICampaignDesignerProps {
    campaignData: ICampaignData;
}

class CampaignDesigner extends React.Component<ICampaignDesignerProps, any> {
    public render() {
        const { title, gameType } = this.props.campaignData;

        return (
            <section className="designForm">
                <FormsyText
                    name="title"
                    floatingLabelText="Campaign Title"
                    required
                    value={title}
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
                    <MenuItem value=" " primaryText=" "/>
                    <MenuItem value="dnd35" label="Dungeons & Dragons v3.5" primaryText="D&D 3.5" />
                    <MenuItem value="dnd5" label="Dungeons & Dragons 5e" primaryText="D&D 5" />
                    <Divider/>
                    <MenuItem value="other" label="What did you expect?" primaryText="Other Game Type" />
                </FormsySelect>
            </section>
        );
    }
}

export default CampaignDesigner;
