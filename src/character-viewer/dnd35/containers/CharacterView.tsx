import * as React from "react";

import { Tabs, Tab, Table, TableHeader, TableRow, TableHeaderColumn,
    TableBody, TableRowColumn, Paper } from "material-ui";
    import SwipeableViews from "react-swipeable-views";
import {ICharacterData } from "character-data/CharacterData";

interface ICharacterViewState {
    slideIndex: number;
    modifiers:any;
}
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
    ];

class CharacterView extends React.Component<ICharacterData, ICharacterViewState>{
    constructor(props){
        super(props);
        this.state = {
            modifiers:{},
            slideIndex:0,
        } as ICharacterViewState;
    }

    public render() {
        console.log(this.props);
        const DETAILS_DOM = Object.keys(this.props.details).map((key) =>{
            const value = this.props.details[key];
            const capitalKey = key.charAt(0).toUpperCase()+key.slice(1)

            return <h3 key={key}><u>{capitalKey}</u>: {value}</h3>;
        });

        const STATS_DOM = Object.keys(this.props.stats).map((key) =>{
            const value = this.props.stats[key];
            const tinyName = key.substring(0,3).toUpperCase()
            const modifier = Math.floor((this.props.stats[key] - 10) / 2);
            this.state.modifiers[tinyName]=modifier;
            return (
                <TableRow key={key} hoverable={true}>
                    <TableRowColumn className="statColumn">{tinyName}</TableRowColumn>
                    <TableRowColumn className="statScoreColumn">{value}</TableRowColumn>
                    <TableRowColumn className="statModColumn" name={"stats."+tinyName}>{modifier}</TableRowColumn>
                </TableRow>);
        });

        const STATS_TABLE =
                            <Table selectable={false} className="statTable">
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Ability</TableHeaderColumn>
                                        <TableHeaderColumn>Score</TableHeaderColumn>
                                        <TableHeaderColumn>Modifier</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {STATS_DOM}
                                </TableBody>
                            </Table>;

        const SKILLS_HEADER = <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Skill</TableHeaderColumn>
                                <TableHeaderColumn>Key Ability</TableHeaderColumn>
                                <TableHeaderColumn>Ability Modifier</TableHeaderColumn>
                                <TableHeaderColumn>Ranks</TableHeaderColumn>
                                <TableHeaderColumn>Skill Modifier</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>;

        const SKILLS_DOM = SKILLS.map((skill)=> {

            const skillName = skill["name"];
            const ability = skill["ability"];
            const untrained = skill["untrained"];
            const abilityMod = this.state.modifiers[ability];
            var ranks = this.props.skills[skillName];
            if(ranks === undefined){
                ranks = 0;
            }
            // Name, Ability, Ability Mod, Ranks, Skill Mod
            return (
                <TableRow key={skillName} hoverable={true}>
                    <TableRowColumn>{skillName}</TableRowColumn>
                    <TableRowColumn>{ability}</TableRowColumn>
                    <TableRowColumn>{abilityMod}</TableRowColumn>
                    <TableRowColumn>{ranks}</TableRowColumn>
                    <TableRowColumn>{ranks+abilityMod}</TableRowColumn>
                </TableRow>);
        });
        console.log(this.props);
        console.log("State");
        console.log(this.state);
        const SKILLS_TABLE =
            <Table selectable={false} className="skillTable">
               {SKILLS_HEADER}
                <TableBody displayRowCheckbox={false}>
                    {SKILLS_DOM}
                </TableBody>
            </Table>;

        return(
        <section className="charViewerInfo">
            <Paper>
                <Tabs
                onChange={this.setSlideIndex.bind(this)}
                value={this.state.slideIndex}>
                    <Tab label="Overview" value={0} />
                    <Tab label="Details" value={1} />
                    <Tab label="Stats" value={2} />
                    <Tab label="Skills" value={3} />
                </Tabs>
                <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.setSlideIndex.bind(this)}
                    >
                    <div className="charOverviewTab">
                        <div>
                            <h1><u>Details</u></h1>
                            {DETAILS_DOM}
                        </div>
                        <div>
                            {STATS_TABLE}
                        </div>
                        <div>
                            {SKILLS_TABLE}
                        </div>
                    </div>
                    <div className="charDetailTab">
                        <h1><u>Details</u></h1>
                        {DETAILS_DOM}
                    </div>
                    <div>
                        {STATS_TABLE}
                    </div>
                    <div className="charSkillTab">
                        {SKILLS_TABLE}
                    </div>
                </SwipeableViews>
            </Paper>
        </section>

        );
    }
    private setSlideIndex(value) {
        this.setState({slideIndex: value, modifiers: this.state.modifiers});
    }
}

export default CharacterView;
