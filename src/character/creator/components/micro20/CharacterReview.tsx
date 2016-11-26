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
        console.log(this.props.data);
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
                        <Tab label="Skills" value={3} />
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
                                <TableRow key="skills" hoverable={true}>
                                    <TableRowColumn>skills</TableRowColumn>
                                    <TableRowColumn>{JSON.stringify(data.skills)}</TableRowColumn>
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
                                    {skillRows}
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
