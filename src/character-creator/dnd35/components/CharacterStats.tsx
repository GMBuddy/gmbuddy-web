import * as React from "react";
import { FormsyText } from "formsy-material-ui/lib";
import { ICharacterData} from "character-data/CharacterData";
import { IconButton, TextField } from "material-ui";
import { PlacesCasino } from "material-ui/svg-icons";
import { isUndefined } from "lodash";

const STATS = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
];

interface ICharacterStatsState {
    modifiers: any;
}

class CharacterStats extends React.Component<ICharacterData, ICharacterStatsState> {
    constructor(props: any) {
        super(props);
        this.state = { modifiers: {} };
    }

    public render() {
        const stats = STATS.map((stat) => {

            return  <div className="statContainer" key={stat + "Container"}>
                <FormsyText
                    className="statValue"
                    key={stat}
                    name={"stats." + stat}
                    floatingLabelText={stat}
                    type="number"
                    required
                    value={this.props.stats[stat]}
                    validations="isInt"
                    onChange={this.updateModifier.bind(this, stat, null)}
                />
                <TextField
                    key={stat + "Mod"}
                    className="statModifier"
                    disabled={true}
                    floatingLabelFixed={true}
                    value={this.state.modifiers[stat]}
                    floatingLabelText={stat.substring(0, 3).toUpperCase() + " Modifier"}
                />
                <IconButton
                    onClick={this.roll.bind(this, stat)}
                    className="statIcon"
                    tooltip={"Roll " + stat}
                ><PlacesCasino/></IconButton>
            </div>;
        });

        return (
            <section className="statsForm">
                {stats}
            </section>
        );
    }

    private roll(stat, event) {
        // Roll 4d6 and discard the lowest die.
        let rollTotal = 0;
        let smallestRoll = 6;

        for (let i = 0; i < 4; i++) {
            const die = Math.ceil(Math.random() * 6);
            smallestRoll = Math.min(smallestRoll, die);
            rollTotal += die;
        }
        rollTotal -= smallestRoll;

        this.props.stats[stat] = rollTotal;
        this.updateModifier(stat, rollTotal, null);
    }

    /* tslint:disable */
    private componentDidMount() {
        this.updateAllModifiers();
    }
    /* tslint:enable */

    private updateAllModifiers() {
        let newState = {};

        for (const stat in this.props.stats) {
            if (!isUndefined(stat)) {
                newState[stat] = Math.floor((this.props.stats[stat] - 10) / 2);
            }
        }

        this.setState({modifiers: newState});
    }

    private updateModifier(stat: string, value: number, event) {
        let newState = {};
        newState[stat] = Math.floor(((value || event.target.value) - 10) / 2);
        this.setState({modifiers: newState});
    }
}

export default CharacterStats;
