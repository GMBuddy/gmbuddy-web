import * as React from "react";

import { Paper } from "material-ui";
import DnD35CharacterViewer from "./DnD35CharacterViewer";
interface ICharacterViewerState {
    gameType; string;
    step: number;
};

const CHAR_DETAILS = {
                "name": "Steve the Wizard",
                "player": "Stephen",
                "class": "Sorcerer",
                "level": "1",
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

const CHAR_ITEMS = [
            {
                "name": "asdf", "type": "Armor", "damageDieAmount": "2",
                "damageDie": "6", "damageType": "Piercing", "weight": "5",
                "range": "5", "twoHanded": false,
            }
        ];
const CHAR_SKILLS = {"SpellCraft": 6, "Appraise": 5,};
const CHAR_STATS = {
                "Strength": 7, "Dexterity": 14, "Constitution": 16,
                "Intelligence": 10, "Wisdom": 15, "Charisma": 18,
            };
class CharacterViewer extends React.Component<void, ICharacterViewerState> {
    constructor() {
        super();
        this.state = {} as ICharacterViewerState;
    }
    public render() {
        let data = {
            details : CHAR_DETAILS,
            items: CHAR_ITEMS,
            skills: CHAR_SKILLS,
            stats: CHAR_STATS,
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
