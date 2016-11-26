import * as React from "react";
import { MenuItem } from "material-ui";
import { FormsyText, FormsySelect } from "formsy-material-ui/lib";
import { ICharacterData } from "gmbuddy/micro20/character";
import { CASTSPELLS, ARCANESPELLS, DIVINESPELLS } from "../../../constants/micro20";

interface ICharacterSpellsProps extends ICharacterData {
    disabled?: boolean;
}

class CharacterSpells extends React.Component<ICharacterSpellsProps, any> {
    private arcaneSpellMenu;
    private divineSpellMenu;

    private constructor(props) {
        super(props);
        // HEY STEVE TODO:
        // Do a map here, gotta have to generate a menu for each level of spells
        // Add another map thing down below when generating render
        this.arcaneSpellMenu = this.generateMenuItems(ARCANESPELLS);
        this.divineSpellMenu = this.generateMenuItems(DIVINESPELLS);
    }

    public render() {
        console.log(this.props);
        let spellList = {};
        let canCast = CASTSPELLS[this.props.details.class]
        if ( canCast === "none") {
            return <div> No Spells available </div>;
        }
        // const SPELLSELECT = "";
        if (canCast ==="arcane"){
            spellList = ARCANESPELLS;
        }
        return (
            <section className="micro20CharacterSpells">
            <div>
                <FormsyText
                    autoComplete="off"
                    name="spells.favorite"
                    floatingLabelText="Favorite Spell (required)"
                    value={this.props.details.name}
                    disabled={this.props.disabled === true}
                    required
                />
                <FormsySelect
                    name="details.class"
                    floatingLabelText="Class (required)"
                    value={this.props.details.class}
                    required
                    disabled={this.props.disabled === true}
                >
                    <MenuItem primaryText=" "/>
                    {this.arcaneSpellMenu}
                </FormsySelect>
            </div>
            </section>
        );
    }
    private generateMenuItems(menuItems) {
        return menuItems.map((menuName, index) => {
            return <MenuItem key={index} value={menuName.toLowerCase()} primaryText={menuName} />;
        });
    }
}

export default CharacterSpells;
