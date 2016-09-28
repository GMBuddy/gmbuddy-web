import * as React from "react";

import {connect} from "react-redux";
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Paper } from "material-ui";

interface ICharacterReviewProps {
    characterData: any;
}

class CharacterReview extends React.Component<ICharacterReviewProps, any> {
    public render() {
        const { characterData } = this.props;

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
                            {Object.keys(characterData).map(key =>
                                <TableRow key={key} hoverable={true}>
                                    <TableRowColumn>{key}</TableRowColumn>
                                    <TableRowColumn>{characterData[key]}</TableRowColumn>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </section>
        );
    }
}

export default connect()(CharacterReview);
