import * as React from "react";
import { MenuItem } from "material-ui";
import { FormsySelect, FormsyText } from "formsy-material-ui/lib";
import { ICharacterData } from "../CharacterData";

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

const DIETIES = [
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

const CLASSES_DOM = CLASSES.map((className) => {
    return  <MenuItem key={className} primaryText={className} value={className} />;
});

const RACES_DOM = RACES.map((raceName) => {
    return  <MenuItem key={raceName} primaryText={raceName} value={raceName} />;
});

const DIETIES_DOM = DIETIES.map((dietyName) => {
    return  <MenuItem key={dietyName} primaryText={dietyName} value={dietyName} />;
});

const ALIGNMENT_DOM = ALIGNMENTS.map((alignName) => {
    return  <MenuItem key={alignName} primaryText={alignName} value={alignName} />;
});

class CharacterDetails extends React.Component<ICharacterData, any> {
    public render() {
        return (
            <section className="characterDetails">
                <div>
                    <FormsyText
                        autoComplete="off"
                        name="details.name"
                        floatingLabelText="Character Name"
                        value={this.props.details.name}
                        required
                    />
                </div>
                <div>
                    <FormsySelect
                        name="details.class"
                        floatingLabelText="Class"
                        value={this.props.details.class}
                        required
                    >
                        <MenuItem primaryText=" "/>
                        {CLASSES_DOM}
                    </FormsySelect>
                </div>
                <div>
                    <FormsySelect
                        name="details.race"
                        floatingLabelText="Race"
                        value={this.props.details.race}
                        required
                    >
                        <MenuItem primaryText=" "/>
                        {RACES_DOM}
                    </FormsySelect>
                </div>
                <div>
                    <FormsySelect
                        name="details.diety"
                        floatingLabelText="Diety"
                        value={this.props.details.diety}
                        required
                    >
                        <MenuItem primaryText=" "/>
                        {DIETIES_DOM}
                    </FormsySelect>
                </div>
                <div>
                    <FormsySelect
                        name="details.alignment"
                        floatingLabelText="Alignment"
                        value={this.props.details.alignment}
                        required
                    >
                        <MenuItem primaryText=" "/>
                        {ALIGNMENT_DOM}
                    </FormsySelect>
                </div>
            </section>
        );
    }
}

export default CharacterDetails;
