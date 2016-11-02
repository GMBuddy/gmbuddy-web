import * as React from "react";

import { ICampaignData } from "../../containers/CampaignCreator";
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Paper } from "material-ui";

interface ICampaignReviewProps {
    campaignData: ICampaignData;
}

class CampaignReview extends React.Component<ICampaignReviewProps, any> {
    public render() {
        const { campaignData } = this.props;

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
                            {Object.keys(campaignData).map(key =>
                                <TableRow key={key} hoverable={true}>
                                    <TableRowColumn>{key}</TableRowColumn>
                                    <TableRowColumn>{campaignData[key]}</TableRowColumn>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </section>
        );
    }
}

export default CampaignReview;
