import * as React from "react";
import { FormsyText } from "formsy-material-ui/lib";
import { ICharacterData} from "../CharacterData";

const STATS = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
];

class CharacterStats extends React.Component<ICharacterData, any> {
    public render() {
        const stats = STATS.map((stat) => {
            return <FormsyText
                        className="stat"
                        key={stat}
                        name={"stats." + stat}
                        floatingLabelText={stat}
                        type="number"
                        required
                        value={this.props.stats[stat]}
                    />;
        });

        return (
            <section className="statsForm">
                {stats}
            </section>
        );
    }
}

export default CharacterStats;
