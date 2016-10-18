import * as React from "react";
import { Table, TableHeader, TableRow, TableHeaderColumn,
    TableBody, TableRowColumn } from "material-ui";

class StatsPage extends React.Component<any, any> {

    public render() {
        const STATS_DOM = Object.keys(this.props.stats).map((key) => {
            const value = this.props.stats[key];
            const tinyName = key.substring(0, 3).toUpperCase();
            const modifier = Math.floor((this.props.stats[key] - 10) / 2);
            this.props.modifiers[tinyName] = modifier;
            return (
                <TableRow key={key} hoverable={true}>
                    <TableRowColumn className="statColumn">{tinyName}</TableRowColumn>
                    <TableRowColumn className="statScoreColumn">{value}</TableRowColumn>
                    <TableRowColumn className="statModColumn" name={"stats." + tinyName}>{modifier}</TableRowColumn>
                </TableRow>);
        });

        return(
            <div>
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
                </Table>
            </div>
        );
    }
}

export default StatsPage;
