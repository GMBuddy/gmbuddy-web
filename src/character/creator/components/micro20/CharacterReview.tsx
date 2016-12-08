import * as React from "react";
import { Tabs, Tab, Table, TableHeader, TableRow, TableHeaderColumn,
    TableBody, TableRowColumn, Paper } from "material-ui";
import SwipeableViews from "react-swipeable-views";

interface ICharacterReviewState {
    slideIndex: number;
}

interface ICharacterReviewProps {
    gameType: string;
    data: any;
    error: string;
}

class CharacterReview extends React.Component<ICharacterReviewProps, ICharacterReviewState> {
    constructor(props) {
        super(props);
        this.state = { slideIndex: 0 };
    }
    public render() {
        const { data } = this.props;

        const errorMessage = () => {
            if (!this.props.error) {
                return null;
            }

            return <p style={{color: "red"}}>ERROR: {this.props.error}</p>;
        };

        const detailRows = Object.keys(this.props.data.details).map((key) => {
            const value = this.props.data.details[key];
            return  <TableRow key={key}>
                        <TableRowColumn>{key}</TableRowColumn>
                        <TableRowColumn>{value}</TableRowColumn>
                    </TableRow>;
        });

        const statRows = Object.keys(this.props.data.stats).map((key) => {
            const value = this.props.data.stats[key];
            return  <TableRow key={key}>
                        <TableRowColumn>{key}</TableRowColumn>
                        <TableRowColumn>{value}</TableRowColumn>
                    </TableRow>;
        });

        const skillRows = Object.keys(this.props.data.skills).map((key) => {
            const ranks = this.props.data.skills[key].rank;
            return <TableRow key={key}>
                        <TableRowColumn>{key}</TableRowColumn>
                        <TableRowColumn>{ranks}</TableRowColumn>
                        </TableRow>;
        });
        let spellRows;
        if (this.props.data.spells) {
            spellRows = Object.keys(this.props.data.spells).map((key) => {
                const spell = this.props.data.spells[key];
                return <TableRow key={key}>
                            <TableRowColumn>{key}</TableRowColumn>
                            <TableRowColumn>{spell}</TableRowColumn>
                            </TableRow>;
            });
        }
        const calculatedRows = Object.keys(this.props.data.calculated).map((key) => {
            const value = this.props.data.calculated[key];
            return  <TableRow key={key}>
                <TableRowColumn>{key}</TableRowColumn>
                <TableRowColumn>{value}</TableRowColumn>
            </TableRow>;
        });

        const itemRows = this.props.data.items.map((item, index) => {
            return  <TableRow key={index}>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.type}</TableRowColumn>
                <TableRowColumn>{item.damageDieAmount || 0}d{item.damageDie || 0}</TableRowColumn>
                <TableRowColumn>{item.damageType}</TableRowColumn>
                <TableRowColumn>{item.twoHands || "false"}</TableRowColumn>
                <TableRowColumn>{item.weight}</TableRowColumn>
                <TableRowColumn>{item.range}</TableRowColumn>
            </TableRow>;
        });

        return (
            <section>
                {errorMessage()}
                <p>Here's a preview of what will be sent to the server:</p>
                <Paper>
                    <Tabs
                    onChange={this.setSlideIndex.bind(this)}
                    value={this.state.slideIndex}>
                        <Tab label="Overview" value={0} />
                        <Tab label="Details" value={1} />
                        <Tab label="Stats" value={2} />
                        <Tab label="Calculated" value={3} />
                        <Tab label="Skills" value={4} />
                        <Tab label="Spells" value={5} />
                        <Tab label="Items" value={6} />
                    </Tabs>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.setSlideIndex.bind(this)}
                    >
                        <Table selectable={false}>
                            <TableHeader displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>Key</TableHeaderColumn>
                                    <TableHeaderColumn>Value</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow key="gameType" hoverable={true}>
                                    <TableRowColumn>gameType</TableRowColumn>
                                    <TableRowColumn>Microlite20</TableRowColumn>
                                </TableRow>
                                <TableRow key="details" hoverable={true}>
                                    <TableRowColumn>details</TableRowColumn>
                                    <TableRowColumn>{JSON.stringify(data.details)}</TableRowColumn>
                                </TableRow>
                                <TableRow key="stats" hoverable={true}>
                                    <TableRowColumn>stats</TableRowColumn>
                                    <TableRowColumn>{JSON.stringify(data.stats)}</TableRowColumn>
                                </TableRow>
                                <TableRow key="calculated" hoverable={true}>
                                    <TableRowColumn>calculated</TableRowColumn>
                                    <TableRowColumn>{JSON.stringify(data.calculated)}</TableRowColumn>
                                </TableRow>
                                <TableRow key="skills" hoverable={true}>
                                    <TableRowColumn>skills</TableRowColumn>
                                    <TableRowColumn>{JSON.stringify(data.skills)}</TableRowColumn>
                                </TableRow>
                                <TableRow key="spells" hoverable={true}>
                                    <TableRowColumn>spells</TableRowColumn>
                                    <TableRowColumn>{JSON.stringify(data.spells)}</TableRowColumn>
                                </TableRow>
                                <TableRow key="items" hoverable={true}>
                                    <TableRowColumn>items</TableRowColumn>
                                    <TableRowColumn>{JSON.stringify(data.items)}</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div>
                            <Table selectable={false}>
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Key</TableHeaderColumn>
                                        <TableHeaderColumn>Value</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {detailRows}
                                </TableBody>
                            </Table>
                        </div>
                        <div>
                            <Table selectable={false}>
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Key</TableHeaderColumn>
                                        <TableHeaderColumn>Value</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {statRows}
                                </TableBody>
                            </Table>
                        </div>
                        <div>
                            <Table selectable={false}>
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Key</TableHeaderColumn>
                                        <TableHeaderColumn>Value</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {calculatedRows}
                                </TableBody>
                            </Table>
                        </div>
                        <div>
                            <Table selectable={false}>
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Key</TableHeaderColumn>
                                        <TableHeaderColumn>Value</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {skillRows}
                                </TableBody>
                            </Table>
                        </div>
                        <div>
                            <Table selectable={false}>
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Key</TableHeaderColumn>
                                        <TableHeaderColumn>Value</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {spellRows}
                                    </TableBody>
                            </Table>
                        </div>
                        <div>
                            <Table>
                                <TableHeader>
                                        <TableRow>
                                            <TableHeaderColumn>Name</TableHeaderColumn>
                                            <TableHeaderColumn>Type</TableHeaderColumn>
                                            <TableHeaderColumn>Damage</TableHeaderColumn>
                                            <TableHeaderColumn>Damage Type</TableHeaderColumn>
                                            <TableHeaderColumn>Two Hands</TableHeaderColumn>
                                            <TableHeaderColumn>Weight</TableHeaderColumn>
                                            <TableHeaderColumn>Range</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        {itemRows}
                                    </TableBody>
                            </Table>
                        </div>
                    </SwipeableViews>
                </Paper>
            </section>
        );
    }

    private setSlideIndex(value) {
        this.setState({slideIndex: value});
    }
}

export default CharacterReview;
