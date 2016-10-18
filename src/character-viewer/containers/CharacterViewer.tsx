import * as React from "react";

import { Paper } from "material-ui";
import DnD35CharacterViewer from "./DnD35CharacterViewer";
interface ICharacterViewerState {
    gameType; string;
    step: number;
};

class CharacterViewer extends React.Component<void, ICharacterViewerState> {
    constructor() {
        super();
        this.state = {} as ICharacterViewerState;
    }
    public render() {
        let data = {
            details : {
                "name": "Steve the Wizard", "class": "Sorcerer", "level": "3",
                "race": "Human", "diety": "Kord", "alignment": "Chaotic Neutral",
            },
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
            details={data.details}
            stats={data.stats}
            skills={data.skills}
            items={data.items}/>;

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
