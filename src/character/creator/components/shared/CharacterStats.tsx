import * as React from "react";
import { FormsyText } from "formsy-material-ui/lib";
import { FlatButton, IconButton, TextField } from "material-ui";
import { PlacesCasino } from "material-ui/svg-icons";
import { isUndefined } from "lodash";

interface ICharacterStatsProps {
    names: string[];
    stats: number[];
}

interface ICharacterStatsState {
    modifiers: any;
}

class CharacterStats extends React.Component<ICharacterStatsProps, ICharacterStatsState> {
    constructor(props: any) {
        super(props);
        this.state = { modifiers: {} };
    }

    public render() {
        const stats = this.props.names.map((stat) => {
            return  <div className="statContainer" key={stat + "Container"}>
                <FormsyText
                    className="statValue"
                    key={stat}
                    name={"stats." + stat}
                    floatingLabelText={stat[0].toUpperCase() + stat.slice(1)}
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
                    className="rollButton"
                    onClick={this.roll.bind(this, stat)}
                    tooltip={"Roll " + stat}
                ><PlacesCasino/></IconButton>
            </div>;
        });

        return (
            <section className="characterStats">
                {stats}

                <FlatButton onTouchTap={this.rollAll.bind(this)}>
                    <PlacesCasino className="rollAllIcon"/> Roll All
                </FlatButton>
            </section>
        );
    }

    private roll(stat, updateModifier = true) {
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

        if (updateModifier) {
            this.updateModifier(stat, rollTotal, null);
        }
    }

    private rollAll() {
        this.props.names.forEach(stat => {
            this.roll(stat);
            this.updateAllModifiers();
        });
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
        if (stat) {
            const trueValue = value || event.target.value || 0;
            this.props.stats[stat] = trueValue;

            let newState = {};
            newState[stat] = Math.floor((trueValue - 10) / 2);
            this.setState({modifiers: newState});
        }
    }
}

export default CharacterStats;
