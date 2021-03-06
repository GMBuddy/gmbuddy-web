import * as React from "react";
import { Tabs, Tab, Paper } from "material-ui";
import SwipeableViews from "react-swipeable-views";
import CharacterSkills from "./SkillsPage";
import CharacterStats from  "./StatsPage";
import CharacterDetails from  "./DetailsPage";
import CharacterItems from "./ItemsPage";
import { ICharacterData } from "gmbuddy/dnd35/character";

interface ICharacterViewState {
    slideIndex: number;
    modifiers: any;
}

class CharacterView extends React.Component<ICharacterData, ICharacterViewState> {
    constructor(props) {
        super(props);
        this.state = {
            modifiers: {},
            slideIndex: 0,
        } as ICharacterViewState;
    }

    public render() {
        let steps = {
            Details: <CharacterDetails
                key="details"
                details={this.props.details} />,
            Items: <CharacterItems
                key="items"
                items={this.props.items} />,
            Skills: <CharacterSkills
                key="skills"
                skills={this.props.skills}
                modifiers={this.state.modifiers} />,
            Stats: <CharacterStats
                key="stats"
                stats={this.props.stats}
                modifiers={this.state.modifiers} />,
        };
        return(
            <section className="charViewerInfo">
                <Paper>
                    <Tabs
                        onChange={this.setSlideIndex.bind(this)}
                        value={this.state.slideIndex}
                    >
                        <Tab label="Overview" value={0} />
                        <Tab label="Details" value={1} />
                        <Tab label="Stats" value={2} />
                        <Tab label="Skills" value={3} />
                        <Tab label="Items" value={4} />
                    </Tabs>
                    <SwipeableViews
                            index={this.state.slideIndex}
                            onChangeIndex={this.setSlideIndex.bind(this)}
                        >
                        <section className="charOverviewTab">
                            <div className="detailsOverview">
                                {steps.Details}
                                <div className="imageDiv">
                                    <img src="http://www.albinjohnson.com/d&d/resources/graphics/dnd-logo.gif"/>
                                </div>
                            </div>
                            <div className="statsOverview">
                                {steps.Stats}
                            </div>
                            <div className="skillsOverview">
                                <h1><u>Skills</u></h1>
                                {steps.Skills}
                            </div>
                            <div className="itemsOverview">
                                <h1><u>Items</u></h1>
                                {steps.Items}
                            </div>
                        </section>
                        <div className="charDetailsTab">
                            {steps.Details}
                        </div>
                        <div className="charStatsTab">
                            {steps.Stats}
                        </div>
                        <div className="charSkillsTab">
                            {steps.Skills}
                        </div>
                        <div className="charItemsTab">
                            {steps.Items}
                        </div>
                    </SwipeableViews>
                </Paper>
            </section>
        );
    }

    private setSlideIndex(value) {
        this.setState({slideIndex: value} as ICharacterViewState);
    }
}

export default CharacterView;
