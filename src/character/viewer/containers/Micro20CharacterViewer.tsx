import * as React from "react";
import * as Formsy from "formsy-react";
import { connect } from "react-redux";
import { FormsyText } from "formsy-material-ui/lib";
import { CLASSES, RACES } from "../../constants/micro20";
import {FormsySelect} from "formsy-material-ui/lib";
import { MenuItem } from "material-ui";

interface ICharacterViewerProps {
    dispatch: any;
    characterId: string;
}

class Micro20CharacterViewer extends React.Component<ICharacterViewerProps, void> {
    private classesMenu;
    private racesMenu;

    private constructor(props) {
        super(props);
        this.classesMenu = this.generateMenuItems(CLASSES);
        this.racesMenu = this.generateMenuItems(RACES);
    }
    public render() {
        return (
            <section className="characterViewer">
                <Formsy.Form>
                    <div className="details">
                        <div>
                            <FormsyText
                                autoComplete="off"
                                name="details.name"
                                floatingLabelText="Character Name (required)"
                                value="Dude"
                                disabled
                                required
                            />
                        </div>
                        <FormsySelect
                            name="details.class"
                            floatingLabelText="Class (required)"
                            value="mage"
                            disabled
                            required
                        >
                            <MenuItem primaryText=" "/>
                            {this.classesMenu}
                        </FormsySelect>
                        <FormsySelect
                            name="details.race"
                            floatingLabelText="Race (required)"
                            value="human"
                            disabled
                            required
                        >
                            <MenuItem primaryText=" "/>
                            {this.racesMenu}
                        </FormsySelect>
                    </div>
                    <div className="stats">
                        <FormsyText
                            name="strength"
                            type="number"
                            validationError="This field must be an integer."
                            validations="isInt"
                            floatingLabelText="Strength"
                            value={10}
                            disabled
                            required
                        />
                        <FormsyText
                            name="dexterity"
                            type="number"
                            validationError="This field must be an integer."
                            validations="isInt"
                            floatingLabelText="Dexterity"
                            value={11}
                            disabled
                            required
                        />
                        <FormsyText
                            name="mind"
                            type="number"
                            validationError="This field must be an integer."
                            validations="isInt"
                            floatingLabelText="Mind"
                            value={12}
                            disabled
                            required
                        />
                    </div>
                </Formsy.Form>
            </section>);
    }

    // TODO: Remove duplication of this function
    private generateMenuItems(menuItems) {
        return menuItems.map((menuName, index) => {
            return <MenuItem key={index} value={menuName.toLowerCase()} primaryText={menuName} />;
        });
    }
}

export default connect()(Micro20CharacterViewer);
