import * as React from "react";
import { MenuItem } from "material-ui";
import { FormsyText, FormsySelect } from "formsy-material-ui/lib";
import { ICharacterData } from "gmbuddy/micro20/character";
import { CLASSES, RACES } from "../../../constants/micro20";

class CharacterDetails extends React.Component<ICharacterData, any> {
    private classesMenu;
    private racesMenu;

    private constructor(props) {
        super(props);
        this.classesMenu = this.generateMenuItems(CLASSES);
        this.racesMenu = this.generateMenuItems(RACES);
    }

    public render() {
        return (
            <section className="characterDetails">
                <div>
                    <FormsyText
                        autoComplete="off"
                        name="details.name"
                        floatingLabelText="Character Name (required)"
                        value={this.props.details.name}
                        required
                    />
                </div>
                <FormsySelect
                    name="details.class"
                    floatingLabelText="Class (required)"
                    value={this.props.details.class}
                    required
                >
                    <MenuItem primaryText=" "/>
                    {this.classesMenu}
                </FormsySelect>
                <FormsySelect
                    name="details.race"
                    floatingLabelText="Race (required)"
                    value={this.props.details.race}
                    required
                >
                    <MenuItem primaryText=" "/>
                    {this.racesMenu}
                </FormsySelect>
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
