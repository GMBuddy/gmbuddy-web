import * as React from "react";
import { MenuItem } from "material-ui";
import { FormsyText, FormsySelect } from "formsy-material-ui/lib";
import { ICharacterData } from "gmbuddy/micro20/character";

const CLASSES = [
    <MenuItem key="fighter" value="fighter" primaryText="Fighter" />,
    <MenuItem key="rogue" value="rogue" primaryText="Rogue" />,
    <MenuItem key="mage" value="mage" primaryText="Mage" />,
    <MenuItem key="cleric" value="cleric" primaryText="Cleric" />,
];

const RACES = [
    <MenuItem key="human" value="human" primaryText="Human" />,
    <MenuItem key="elf" value="elf" primaryText="Elf" />,
    <MenuItem key="dwarf" value="dwarf" primaryText="Dwarf" />,
    <MenuItem key="halfling" value="halfling" primaryText="Halfling" />,
];

class CharacterDetails extends React.Component<ICharacterData, any> {
    public render() {
        return (
            <section className="characterDetails">
                <div>
                    <FormsyText
                        autoComplete="off"
                        name="details.name"
                        floatingLabelText="Character Name (required)"
                        value={this.props.details.name}
                        required
                    />
                </div>
                <FormsySelect
                    name="details.class"
                    floatingLabelText="Class (required)"
                    value={this.props.details.class}
                    required
                >
                    <MenuItem primaryText=" "/>
                    {CLASSES}
                </FormsySelect>
                <FormsySelect
                    name="details.race"
                    floatingLabelText="Race (required)"
                    value={this.props.details.race}
                    required
                >
                    <MenuItem primaryText=" "/>
                    {RACES}
                </FormsySelect>
            </section>
        );
    }
}

export default CharacterDetails;
