import * as React from "react";
import { FormsySelect, FormsyText } from "formsy-material-ui/lib";
import { MenuItem, Divider } from "material-ui";

interface ICharacterModuleProps {
    gameType: string;
}

class CharacterModule extends React.Component<ICharacterModuleProps, any> {
    public render() {
        const { gameType } = this.props;

        return (
            <section className="designForm">
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
                    <MenuItem value="dnd35" label="Dungeons & Dragons v3.5" primaryText="D&D 3.5" />
                    <MenuItem value="dnd5" label="Dungeons & Dragons 5e" primaryText="D&D 5" />
                    <Divider/>
                    <MenuItem value="other" label="What did you expect?" primaryText="Other Game Type" />
                </FormsySelect>
            </section>
        );
    }
}

export default CharacterModule;
