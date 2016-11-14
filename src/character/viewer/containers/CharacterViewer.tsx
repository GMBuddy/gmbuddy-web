import * as React from "react";
import { Paper } from "material-ui";
import DnD35CharacterViewer from "../components/dnd35/DnD35CharacterViewer";

interface ICharacterViewerState {
    gameType; string;
    step: number;
};

const CHAR_DETAILS = {
                "player": "Stephen",
                "name": "Steve the Wizard",
                "class": "Sorcerer",
                "level": "3",
                "race": "Human",
                "alignment": "Chaotic Neutral",
                "deity": "Kord",
                "size": "M",
                "age": "21",
                "gender": "M",
                "height": "6\'1\"",
                "weight": "165",
                "eyes": "hazel",
                "hair": "brown",
                "skin": "tan",
            };

class CharacterViewer extends React.Component<void, ICharacterViewerState> {
    constructor() {
        super();
        this.state = {} as ICharacterViewerState;
    }
    public render() {
        let data = {
            details : CHAR_DETAILS,
            items: [
                {
                    "name": "asdf", "type": "Armor", "damageDieAmount": "2",
                    "damageDie": "6", "damageType": "Piercing", "weight": "5",
                    "range": "5", "twoHanded": false,
                },
            ],
            skills: {"SpellCraft": 6, "Appraise": 5},
            stats: {
                "Strength": 7, "Dexterity": 14, "Constitution": 16,
                "Intelligence": 10, "Wisdom": 15, "Charisma": 18,
            },
        };
        let currentCharacter = <DnD35CharacterViewer
            data={data}/>;

        return(
            <section>
                <Paper>
                    {currentCharacter}
                </Paper>
            </section>
            );
    }
}

export default CharacterViewer;
