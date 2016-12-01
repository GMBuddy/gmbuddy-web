import * as React from "react";
import { FormsyText } from "formsy-material-ui/lib";
import { ICharacterData } from "gmbuddy/micro20/character";
import { TextField, IconButton } from "material-ui";
import { PlacesCasino } from "material-ui/svg-icons";

interface ICharacterDetailsContProps extends ICharacterData {
    strength: number;
    disabled?: boolean;
}

interface ICharacterDetailsContState {
    totalHealth: number;
    strMod: number;
}

class CharacterDetailsCont extends React.Component<ICharacterDetailsContProps, ICharacterDetailsContState> {
    constructor(props: any) {
        super(props);
        var strMod = Math.floor(((this.props.strength || 0) - 10) / 2);
        this.state = { totalHealth: strMod, strMod };
    }

    public render() {
        return (
            <section className="micro20CharacterDetailsCont">
                <div className="statContainer">
                    <TextField
                        key="Strength Mod"
                        className="statModifier"
                        disabled={true}
                        floatingLabelFixed={true}
                        value={this.state.strMod}
                        floatingLabelText="STR Modifier"
                    />
                    <span style={{margin: "10px"}}>+</span>
                    <FormsyText
                        type="number"
                        key="health"
                        name="calculated.health"
                        value={this.props.calculated.health}
                        validations="isInt"
                        floatingLabelFixed={true}
                        required
                        floatingLabelText="Health Roll (1d6 per level) (required)"
                        onChange={this.updateHealth.bind(this, null)}
                    />
                    <span style={{margin: "10px"}}>=</span>
                    <TextField
                        name="totalhealth"
                        autoComplete="off"
                        floatingLabelText="Character Health"
                        disabled={true}
                        value={this.state.totalHealth}
                    />
                    <IconButton
                        className="rollButton"
                        onClick={this.roll.bind(this)}
                        tooltip={"Roll Health"}
                    ><PlacesCasino/></IconButton>
                </div>
            </section>
        );
    }

    private roll() {
        // Roll 1d6 per level.
        const level = 1; //TODO: replace with actual character's level.

        let rollTotal = 0;

        for (let i = 0; i < level; i++) {
            rollTotal += Math.ceil(Math.random() * 6);
        }

        this.props.calculated.health = rollTotal;
        this.updateHealth(rollTotal, null);
    }

    private updateHealth(newHealth: number, event) {
        const health = parseInt(newHealth || event.target.value || 0);
        this.props.calculated.health = health;
        this.setState({totalHealth: (health + this.state.strMod)} as ICharacterDetailsContState);
    }
}

export default CharacterDetailsCont;
