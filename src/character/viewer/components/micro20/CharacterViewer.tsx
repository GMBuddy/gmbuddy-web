import * as React from "react";
import * as Formsy from "formsy-react";
import { CLASSES, RACES } from "../../../constants/micro20";
import { MenuItem } from "material-ui";
import CharacterDetails from "../../../creator/components/micro20/CharacterDetails";
import { FormsyText } from "formsy-material-ui/lib";
import { ICharacterData } from "gmbuddy/micro20/character";

interface ICharacterViewerProps {
    character: ICharacterData;
}

interface ICharacterViewerState {
    editing: boolean;
}

class Micro20CharacterViewer extends React.Component<ICharacterViewerProps, ICharacterViewerState> {
    private classesMenu;
    private racesMenu;

    private constructor(props) {
        super(props);
        this.classesMenu = this.generateMenuItems(CLASSES);
        this.racesMenu = this.generateMenuItems(RACES);
        this.state = { editing: false } as ICharacterViewerState;
    }

    public render() {
        const { baseStats, details } = this.props.character;

        if (details.class && CLASSES[details.class]) {
            details.class = CLASSES[details.class].toLowerCase();
        }
        if (details.race && RACES[details.race]) {
            details.race = RACES[details.race].toLowerCase();
        }

        return (
            <section className="characterViewer">
                <Formsy.Form>
                    <p><strong>Character created by user:</strong> {details.userId}</p>
                    <h3>Details</h3>
                    <CharacterDetails disabled={!this.state.editing} details={details}/>
                    <h3>Stats</h3>
                    <div className="characterStats">
                        <FormsyText
                            autoComplete="off"
                            name="stats.strength"
                            floatingLabelText="Strength"
                            value={baseStats.strength}
                            disabled={!this.state.editing}
                        />
                        <FormsyText
                            autoComplete="off"
                            name="stats.dexterity"
                            floatingLabelText="Dexterity"
                            value={baseStats.dexterity}
                            disabled={!this.state.editing}
                        />
                        <FormsyText
                            autoComplete="off"
                            name="stats.mind"
                            floatingLabelText="Mind"
                            value={baseStats.mind}
                            disabled={!this.state.editing}
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

export default Micro20CharacterViewer;
