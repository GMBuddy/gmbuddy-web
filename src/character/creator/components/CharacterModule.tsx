import * as React from "react";
import { FormsySelect } from "formsy-material-ui/lib";
import { MenuItem } from "material-ui";

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
                    <MenuItem value="dnd35" label="Dungeons & Dragons v3.5" primaryText="D&D 3.5 (UNSUPPORTED)" />
                    <MenuItem value="micro20" label="Microlite20" primaryText="Microlite20" />
                </FormsySelect>
            </section>
        );
    }
}

export default CharacterModule;
