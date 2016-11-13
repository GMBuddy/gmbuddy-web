import * as React from "react";
import { Table, TableHeader, TableRow, TableHeaderColumn,
    TableBody, TableRowColumn } from "material-ui";
import { ICharacterItems } from "character-data/dnd35/CharacterData";

const ITEM_ATTR = ["Name", "Type", "Damage Die Amount", "Damage Die", "Damage Type", "Weight", "Range", "Two Handed"];
class ItemsPage extends React.Component<ICharacterItems, any> {
    public render() {
        const ITEMS_HEADER = ITEM_ATTR.map((header) =>
             <TableHeaderColumn key={header}>{header}</TableHeaderColumn>
        );
        const ITEMS_DOM = this.props.items.map((item, index) => {
                const ITEMS_COLUMNS = Object.keys(item).map((key) =>
                    <TableRowColumn key={key}>{item[key] + ""}</TableRowColumn>
                );
                return <TableRow key={index} hoverable={true}>
                            {ITEMS_COLUMNS}
                        </TableRow>;
        });

        return(
            <div>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            {ITEMS_HEADER}
                        </TableRow>
                    </TableHeader>;
                    <TableBody displayRowCheckbox={false}>
                        {ITEMS_DOM}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default ItemsPage;
