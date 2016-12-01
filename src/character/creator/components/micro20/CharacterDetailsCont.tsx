import * as React from "react";
import { FormsyText } from "formsy-material-ui/lib";
import { ICharacterData } from "gmbuddy/micro20/character";
import { TextField } from "material-ui";

interface ICharacterDetailsContProps extends ICharacterData {
    strength: number;
    disabled?: boolean;
}

interface ICharacterDetailsContState {
    totalHealth: number;
}

class CharacterDetailsCont extends React.Component<ICharacterDetailsContProps, ICharacterDetailsContState> {
    public render() {
        const strValue = this.props.strength || 0;
        const strMod = Math.floor((strValue - 10) / 2);

        const health = strMod + this.props.calculated.health;

        return (
            <section className="micro20CharacterDetailsCont">
                <div className="statContainer">
                    <TextField
                        key="Strength Mod"
                        className="statModifier"
                        disabled={true}
                        floatingLabelFixed={true}
                        value={strMod}
                        floatingLabelText="STR Modifier"
                    />
                    +
                    <FormsyText
                        type="number"
                        key="hp"
                        name="calculated.health"
                        value={this.props.calculated.health}
                        validations="isInt"
                        floatingLabelFixed={true}
                        required
                        floatingLabelText="Health Roll (required)"
                        onChange={this.updateHealth.bind(this)}
                    />
                    =
                    <TextField
                        name="totalhealth"
                        autoComplete="off"
                        floatingLabelText="Character Health"
                        disabled={true}
                    />
                </div>
            </section>
        );
    }

    /* tslint:disable */
    private componentDidMount() {
        this.updateHealth();
    }
    /* tslint:enable */

    private updateHealth() {
        const strMod = Math.floor(((this.props.strength || 0) - 10) / 2);
        this.setState({totalHealth: this.props.calculated.health + strMod})
    }
}

export default CharacterDetailsCont;
