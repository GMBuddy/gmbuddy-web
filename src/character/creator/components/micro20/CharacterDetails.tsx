import * as React from "react";
import { MenuItem } from "material-ui";
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
        this.props.details.level = 1;
        return (
            <section className="micro20CharacterDetails">
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
                <div>
                    <FormsyText
                        autoComplete="off"
                        name="details.level"
                        type="number"
                        floatingLabelText="Character Level"
                        value={this.props.details.level}
                        disabled={this.props.disabled === true}
                        required
                    />
                </div>
            </section>
        );
    }

    // TODO: Remove duplication of this function
    private generateMenuItems(menuItems) {
        return menuItems.map((menuName, index) => {
            return <MenuItem key={index} value={menuName.toLowerCase()} primaryText={menuName} />;
        });
    }
}

export default CharacterDetails;
