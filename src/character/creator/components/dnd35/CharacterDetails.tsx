import * as React from "react";
import { AutoComplete } from "material-ui";
import { FormsyAutoComplete, FormsyText } from "formsy-material-ui/lib";
import { ICharacterData } from "../../../data/dnd35/character";

const CLASSES = [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Sorcerer",
    "Rogue",
    "Wizard",
];

const RACES = [
    "Dwarf",
    "Elf",
    "Gnome",
    "Half-Elf",
    "Half-Orc",
    "Halfling",
    "Human",
];

const DEITIES = [
    "Baccob",
    "Corellon Larethian",
    "Ehlonna",
    "Erythnul",
    "Fharlanghn",
    "Garl Glittergold",
    "Gruumsh",
    "Heironeous",
    "Hextor",
    "Kord",
    "Moradin",
    "Nerull",
    "Obad-Hai",
    "Olidammara",
    "Pelor",
    "St. Cuthbert",
    "Vecna",
    "Wee Jas",
    "Yondalla",
];

const ALIGNMENTS = [
    "Lawful Good",
    "Neutral Good",
    "Chaotic Good",
    "Lawful Neutral",
    "True Neutral",
    "Chaotic Neutral",
    "Lawful Evil",
    "Neutral Evil",
    "Chaotic Evil",
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
                <FormsyAutoComplete
                    name="details.class"
                    validations="isExisty"
                    floatingLabelText="Class (required)"
                    dataSource={CLASSES}
                    filter={AutoComplete.caseInsensitiveFilter}
                    openOnFocus={true}
                    value={this.props.details.class}
                    required
                />
                <FormsyAutoComplete
                    name="details.race"
                    validations="isExisty"
                    floatingLabelText="Race (required)"
                    dataSource={RACES}
                    filter={AutoComplete.caseInsensitiveFilter}
                    openOnFocus={true}
                    value={this.props.details.race}
                    required
                />
                <FormsyAutoComplete
                    name="details.alignment"
                    validations="isExisty"
                    floatingLabelText="Alignment (required)"
                    dataSource={ALIGNMENTS}
                    filter={AutoComplete.caseInsensitiveFilter}
                    openOnFocus={true}
                    value={this.props.details.alignment}
                    required
                />
                <FormsyAutoComplete
                    name="details.deity"
                    validations="isExisty"
                    floatingLabelText="Deity"
                    dataSource={DEITIES}
                    filter={AutoComplete.caseInsensitiveFilter}
                    value={this.props.details.deity}
                    openOnFocus={true}
                />
            </section>
        );
    }
}

export default CharacterDetails;