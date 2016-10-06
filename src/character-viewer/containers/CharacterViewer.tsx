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
            skills: {"SpellCraft": 6},
            stats: {
                "Strength": 7, "Dexterity": 14, "Constitution": 16,
                "Intelligence": 10, "Wisdom": 15, "Charisma": 18,
            },
        };
        let currentCharacter = <DnD35CharacterViewer details={data.details} stats={data.stats} skills={data.skills}/>;
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
