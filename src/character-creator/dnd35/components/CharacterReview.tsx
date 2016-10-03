import * as React from "react";

import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Paper } from "material-ui";

interface ICharacterReviewProps {
    gameType: string;
    data: any;
}

class CharacterReview extends React.Component<ICharacterReviewProps, any> {
    public render() {
        const { gameType, data } = this.props;

        return (
            <section>
                <p>Here's a preview of what will be sent to the server:</p>
                <Paper>
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
                                <TableRowColumn>{gameType}</TableRowColumn>
                            </TableRow>
                            <TableRow key="details" hoverable={true}>
                                <TableRowColumn>details</TableRowColumn>
                                <TableRowColumn>{JSON.stringify(data.details)}</TableRowColumn>
                            </TableRow>
                            <TableRow key="stats" hoverable={true}>
                                <TableRowColumn>stats</TableRowColumn>
                                <TableRowColumn>{JSON.stringify(data.stats)}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </section>
        );
    }
}

export default CharacterReview;
