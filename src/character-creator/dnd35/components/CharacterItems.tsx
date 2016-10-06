import * as React from "react";
import { FormsyText } from "formsy-material-ui/lib";
import { Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn, FloatingActionButton, IconButton } from "material-ui";
import { ContentAdd, ActionDelete, EditorModeEdit } from "material-ui/svg-icons"
import {ICharacterItems, ICharacterItem} from "../CharacterData";
import ItemModal from "./CharacterItemModal";

const style = {
    marginRight: 20,
    left: 20,
};

interface ICharacrerItemsState {
    itemModalOpen: boolean;
}

const noItems = [
                    <TableRow hoverable={true}>
                        <TableRowColumn style={{textAlign: "center"}}>Your character has no items.</TableRowColumn>
                    </TableRow>
                ];

class CharacterItems extends React.Component<ICharacterItems, ICharacrerItemsState> {
    constructor() {
        super();
        this.state = {
            itemModalOpen: false,
        };
    }

    public render() {
        let items = noItems;

        if(this.props.items.length > 0) {
            items = this.props.items.map((item, index) => {
                return <TableRow key={index} hoverable={true}>
                            <TableRowColumn>{item.name}</TableRowColumn>
                            <TableRowColumn>{item.type}</TableRowColumn>
                            <TableRowColumn>{item.weight}</TableRowColumn>
                            <TableRowColumn>
                                <IconButton>
                                    <EditorModeEdit />
                                </IconButton>
                                <IconButton>
                                    <ActionDelete />
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
            });
        }

        console.log(items);

        return (
            <section className="characterItems">
                <ItemModal open={this.state.itemModalOpen} closeModal={this.closeItemModal.bind(this)} addItem={this.addItem.bind(this)} />
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Type</TableHeaderColumn>
                            <TableHeaderColumn>Weight</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {items}
                    </TableBody>
                </Table>
                <div className="addItem">
                    <FloatingActionButton secondary={true} style={style} onTouchTap={this.openItemModal.bind(this)}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </section>
        );
    }

    private addItem(itemData: ICharacterItem) {
        this.props.items.push(itemData);
    }

    private openItemModal() {
        this.setState({ itemModalOpen: true });
    }

    private closeItemModal() {
        this.setState({ itemModalOpen: false });
    }
}

export default CharacterItems;
