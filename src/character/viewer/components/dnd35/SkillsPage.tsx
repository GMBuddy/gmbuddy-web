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

interface ISkillsPageProps {
    skills: Object;
    modifiers: Object;
}

class SkillsPage extends React.Component<ISkillsPageProps, any> {
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
        return (
            <div className="skills">
                <Table selectable={false} className="skillTable">
                   {SKILLS_HEADER}
                    <TableBody displayRowCheckbox={false}>
                        {SKILLS_DOM}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default SkillsPage;
