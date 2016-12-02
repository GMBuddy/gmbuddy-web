import * as React from "react";
import { MenuItem, Divider } from "material-ui";
import { FormsyText, FormsySelect } from "formsy-material-ui/lib";
import { ICharacterData } from "gmbuddy/micro20/character";
import { CLASSES, RACES } from "../../../constants/micro20";

interface ICharacterDetailsProps extends ICharacterData {
    disabled?: boolean;
}

class CharacterDetails extends React.Component<ICharacterDetailsProps, any> {
    private classesMenu;
    private racesMenu;

    private constructor(props) {
        super(props);
        this.classesMenu = this.generateMenuItems(CLASSES);
        this.racesMenu = this.generateMenuItems(RACES);
    }

    public render() {
        return (
            <section>
                <div className="micro20CharacterDetails">
                    <div>
                        <FormsyText
                            autoComplete="off"
                            name="details.name"
                            floatingLabelText="Character Name (required)"
                            value={this.props.details.name}
                            disabled={this.props.disabled === true}
                            required
                        />
                    </div>
                    <FormsySelect
                        name="details.class"
                        floatingLabelText="Class (required)"
                        value={this.props.details.class}
                        required
                        disabled={this.props.disabled === true}
                    >
                        <MenuItem primaryText=" "/>
                        {this.classesMenu}
                    </FormsySelect>
                    <FormsySelect
                        name="details.race"
                        floatingLabelText="Race (required)"
                        value={this.props.details.race}
                        required
                        disabled={this.props.disabled === true}
                    >
                        <MenuItem primaryText=" "/>
                        {this.racesMenu}
                    </FormsySelect>
                    <div>
                        <FormsyText
                            autoComplete="off"
                            name="details.height"
                            floatingLabelText="Character Height"
                            value={this.props.details.height}
                            disabled={this.props.disabled === true}
                        />
                    </div>
                    <div>
                        <FormsyText
                            autoComplete="off"
                            name="details.weight"
                            floatingLabelText="Character Weight"
                            value={this.props.details.weight}
                            disabled={this.props.disabled === true}
                        />
                    </div>
                    <div>
                        <FormsyText
                            autoComplete="off"
                            name="details.hairColor"
                            floatingLabelText="Character Hair Color"
                            value={this.props.details.hairColor}
                            disabled={this.props.disabled === true}
                        />
                    </div>
                    <div>
                        <FormsyText
                            autoComplete="off"
                            name="details.eyeColor"
                            floatingLabelText="Character Eye Color"
                            value={this.props.details.eyeColor}
                            disabled={this.props.disabled === true}
                        />
                    </div>
                </div>
                <Divider />
                <div className="micro20CharacterDetails">
                    <FormsyText
                        type="number"
                        key="exp"
                        name="details.el"
                        value={this.props.details.el}
                        validations="isInt"
                        required
                        floatingLabelText="Encounter Level (required)"
                        onChange={this.updateLevel.bind(this, true)}
                        disabled={this.props.disabled === true}
                    />
                    <FormsyText
                        type="number"
                        key="level"
                        name="details.level"
                        validations="isInt"
                        value={this.props.details.level}
                        required
                        floatingLabelText="Level (required)"
                        onChange={this.updateLevel.bind(this, false)}
                        disabled={this.props.disabled === true}
                    />
                </div>
            </section>
        );
    }

    private updateLevel(isExp, event) {
        if (isExp) {
            this.props.details.el = event.target.value;
            this.props.details.level = this.getLevel(event.target.value);
        } else {
            this.props.details.el = this.getEncounterLevel(event.target.value);
            this.props.details.level = event.target.value;
        }
    }

    private getLevel(encounterLevel) {
        let nextLevel = 10;
        let level = 1;

        while (encounterLevel >= nextLevel) {
            encounterLevel -= nextLevel;
            level++;
            nextLevel += 10;
        }

        return level;
    }

    private getEncounterLevel(level) {
        let encounterLevel = 0;

        for (let i = 1; i < level; i++) {
            encounterLevel += 10 * i;
        }

        return encounterLevel;
    }

    // TODO: Remove duplication of this function
    private generateMenuItems(menuItems) {
        return menuItems.map((menuName, index) => {
            return <MenuItem key={index} value={menuName.toLowerCase()} primaryText={menuName} />;
        });
    }
}

export default CharacterDetails;
