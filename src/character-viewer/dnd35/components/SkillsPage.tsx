import * as React from "react";

import { Table, TableHeader, TableRow, TableHeaderColumn,
    TableBody, TableRowColumn } from "material-ui";

const SKILLS = [
        { "name": "Appraise", "ability": "INT", "untrained": true},
        { "name": "Balance", "ability": "DEX", "untrained": true},
        { "name": "Bluff", "ability": "CHA", "untrained": true},
        { "name": "Climb", "ability": "STR", "untrained": true},
        { "name": "Concentration", "ability": "CON", "untrained": true},
        { "name": "Decipher Script", "ability": "INT"},
        { "name": "Diplomacy", "ability": "CHA", "untrained": true},
        { "name": "Disable Device", "ability": "INT"},
        { "name": "Disguise", "ability": "CHA", "untrained": true},
        { "name": "Escape Artist", "ability": "DEX", "untrained": true},
        { "name": "Forgery", "ability": "INT", "untrained": true},
        { "name": "Gather Information", "ability": "CHA", "untrained": true},
        { "name": "Handle Animal", "ability": "CHA"},
        { "name": "Heal", "ability": "WIS", "untrained": true },
        { "name": "Hide", "ability": "DEX", "untrained": true, "acp": true},
        { "name": "Intimidate", "ability": "CHA", "untrained": true },
        { "name": "Jump", "ability": "STR", "untrained": true},
        { "name": "Knowledge (arcana)", "ability": "INT"},
        { "name": "Knowledge (dungeoneering)", "ability": "INT"},
        { "name": "Knowledge (engineering)", "ability": "INT"},
        { "name": "Knowledge (geography)", "ability": "INT"},
        { "name": "Knowledge (history)", "ability": "INT"},
        { "name": "Knowledge (local)", "ability": "INT"},
        { "name": "Knowledge (nature)", "ability": "INT"},
        { "name": "Knowledge (nobility)", "ability": "INT"},
        { "name": "Knowledge (religion)", "ability": "INT"},
        { "name": "Knowledge (planes)", "ability": "INT"},
        { "name": "Knowledge (psionics)", "ability": "INT"},
        { "name": "Listen", "ability": "WIS", "untrained": true },
        { "name": "Move Silently", "ability": "DEX", "untrained": true, "acp": true},
        { "name": "Open Lock", "ability": "DEX"},
        { "name": "Ride", "ability": "DEX", "untrained": true },
        { "name": "Search", "ability": "INT", "untrained": true },
        { "name": "Sense Motive", "ability": "WIS", "untrained": true },
        { "name": "Sleight of Hand", "ability": "DEX", "acp": true},
        { "name": "Spellcraft", "ability": "INT"},
        { "name": "Spot", "ability": "WIS", "untrained": true },
        { "name": "Survival", "ability": "WIS", "untrained": true },
        { "name": "Swim", "ability": "STR", "untrained": true},
        { "name": "Tumble", "ability": "DEX"},
        { "name": "Use Magic Device", "ability": "CHA"},
        { "name": "Use Rope", "ability": "DEX", "untrained": true},
    ];

const SKILLS_HEADER = <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Skill</TableHeaderColumn>
                            <TableHeaderColumn>Key Ability</TableHeaderColumn>
                            <TableHeaderColumn>Ability Modifier</TableHeaderColumn>
                            <TableHeaderColumn>Ranks</TableHeaderColumn>
                            <TableHeaderColumn>Skill Modifier</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>;
const NEW_SKILLS_HEADER = <div className="skillsTableHeader">
                            <div className="name"><p>Skill</p></div>
                            <div className="ability"><p>Key<br/>Ability</p></div>
                            <div className="skillMod"><p>Skill<br/>Modifier</p></div>
                            <div className="abilityMod"><p>Ability<br/>Modifier</p></div>
                            <div className="ranks"><p>Ranks</p></div>
                            <div className="miscMod"><p>Misc<br/>Modifier</p></div>
                        </div>
class SkillsPage extends React.Component<any, any> {
    public render() {
        const SKILLS_DOM = SKILLS.map((skill) => {
            const skillName = skill.name;
            const ability = skill.ability;
            // const untrained = skill.untrained;
            const abilityMod = this.props.modifiers[ability];
            let ranks = this.props.skills[skillName];
            if (ranks === undefined) {
                ranks = 0;
            }

            // Name, Ability, Ability Mod, Ranks, Skill Mod
            return (
                <TableRow key={skillName} hoverable={true}>
                    <TableRowColumn>{skillName}</TableRowColumn>
                    <TableRowColumn>{ability}</TableRowColumn>
                    <TableRowColumn>{abilityMod}</TableRowColumn>
                    <TableRowColumn>{ranks}</TableRowColumn>
                    <TableRowColumn>{ranks + abilityMod}</TableRowColumn>
                </TableRow>
            );
        });
        const NEW_SKILLS_DOM = SKILLS.map((skill) => {
            const skillName = skill.name;
            const ability = skill.ability;
            // const untrained = skill.untrained;
            const abilityMod = this.props.modifiers[ability];
            let ranks = this.props.skills[skillName];
            if (ranks === undefined) {
                ranks = 0;
            }

            // Name, Ability, Ability Mod, Ranks, Skill Mod
            return(
                <div key={skillName} className="skillRow">
                    <div className="skillName"><p>{skillName}</p></div>
                    <div className="skillAbility"><p>{ability}</p></div>
                    <div className="skillMod"><p>{ranks+abilityMod}</p></div>
                    <div className="plusDiv"><p>=</p></div>
                    <div className="skillAbilityMod"><p className="underlineP">{abilityMod}</p></div>
                    <div className="plusDiv"><p>+</p></div>
                    <div className="skillRanks"><p className="underlineP">{ranks}</p></div>
                    <div className="plusDiv"><p>+</p></div>
                    <div className="skillMiscMod"><p className="underlineP">0</p></div>
                </div>
            );
        });

        return (
            <div className="skills">
                <div className="skillsTitle"><p>SKILLS</p></div>
                {NEW_SKILLS_HEADER}
                <div className="skillsList">
                    {NEW_SKILLS_DOM}
                </div>
            </div>
        );
    }
}

export default SkillsPage;
