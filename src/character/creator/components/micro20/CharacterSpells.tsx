import * as React from "react";
import { MenuItem } from "material-ui";
import { FormsySelect } from "formsy-material-ui/lib";
import { ICharacterData } from "gmbuddy/micro20/character";
import { CASTSPELLS, ARCANESPELLS, DIVINESPELLS } from "../../../constants/micro20";
import { isUndefined } from "lodash";

interface ICharacterSpellsProps extends ICharacterData {
    disabled?: boolean;
    spells: any;
}

class CharacterSpells extends React.Component<ICharacterSpellsProps, any> {
    private arcaneSpellMenu;
    private divineSpellMenu;

    private constructor(props) {
        super(props);
        // HEY STEVE TODO:
        // Do a map here, gotta have to generate a menu for each level of spells
        // Add another map thing down below when generating render
        this.arcaneSpellMenu = {};
        /* tslint:disable */
        for (const key in ARCANESPELLS) {
            if (!isUndefined(key)) {
                let menu = this.generateMenuItems(ARCANESPELLS[key]);
                this.arcaneSpellMenu[key] = menu;
            }
        };
        /* tslint:enable */
        this.divineSpellMenu = {};
        for (const key in DIVINESPELLS) {
            if (!isUndefined(key)) {
                let menu = this.generateMenuItems(DIVINESPELLS[key]);
                this.divineSpellMenu[key] = menu;
            }
        };
    }

    public render() {
        let spellList = this.divineSpellMenu;
        let canCast = CASTSPELLS[this.props.details.class];
        if ( canCast === "none") {
            return <div> No Spells available </div>;
        }
        // const SPELLSELECT = "";
        if (canCast === "arcane") {
            spellList = this.arcaneSpellMenu;
        }
        let spellMenu = Object.keys(spellList).map((level) => {
            return <FormsySelect
                    key={level + "SpellList"}
                    className="favoriteSpell"
                    autoComplete="off"
                    name={"spells.favorite." + level}
                    floatingLabelText={"Favorite " + level + " Spell"}
                    value={this.props.spells[level]}
                    disabled={this.props.disabled === true}
                >
                    <MenuItem primaryText=" "/>
                    {spellList[level]}
                </FormsySelect>;
        });
        return (
            <section className="micro20CharacterSpells">
            <div>
                {spellMenu}
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
