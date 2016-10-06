import * as React from "react";
import { AutoComplete, Dialog, FlatButton } from "material-ui";

import * as Formsy from "formsy-react";
import {ICharacterItem} from "../CharacterData";
import { FormsyText, FormsyToggle, FormsyAutoComplete } from "formsy-material-ui/lib";

const ITEM_TYPES = [
    "Adventuring Gear",
    "Armor",
    "Tools",
    "Food/Drink",
    "Jewelry",
    "Material",
    "Poison",
    "Potion",
    "Ring",
    "Shield",
    "Apparel",
    "Weapon",
    "Staff",
]
interface ICreateItemModalProps {
    open: boolean;
    closeModal: () => any;
    addItem: (itemData: ICharacterItem) => any;
}

interface ICreateItemModalState {
    canSubmit: boolean;
}

class CharacterItemModal extends React.Component<ICreateItemModalProps, ICreateItemModalState> {
    private formsyForm;

    constructor() {
        super();
        this.state = {
            canSubmit: false,
        } as ICreateItemModalState;
    }

    public render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.closeModal}
            />,
            <FlatButton
                label="Create"
                primary={true}
                disabled={!this.state.canSubmit}
                type="submit"
                onTouchTap={() => {
                  this.formsyForm.submit();
                }}
            />,
        ];

        return (
            <Dialog
                className="itemModal"
                actions={actions}
                title="Create an Item"
                modal={true}
                open={this.props.open}>
                <Formsy.Form
                    className="itemForm"
                    onValidSubmit={this.submitForm.bind(this)}
                    onValid={this.enableSubmit.bind(this)}
                    onInvalid={this.disableSubmit.bind(this)}
                    ref={(form) => {
                            this.formsyForm = form;
                        }}
                >
                        <FormsyText
                            name="name"
                            validations="isExisty"
                            validationError="Please enter an item name."
                            floatingLabelText="Name (required)"
                            autoComplete="off"
                            required
                        />
                        <FormsyAutoComplete
                            name="type"
                            validations="isExisty"
                            floatingLabelText="Type (required)"
                            dataSource={ITEM_TYPES}
                            filter={AutoComplete.caseInsensitiveFilter}
                            openOnFocus={true}
                            required
                        />
                        <FormsyText
                            name="damageDieAmount"
                            type="number"
                            validationError="This field must be an integer."
                            validations="isInt"
                            floatingLabelText="Damage Die Amount"
                        />
                        <FormsyText
                            name="damageDie"
                            type="number"
                            validationError="This field must be an integer."
                            validations="isInt"
                            floatingLabelText="Damage Die"
                        />

                        <FormsyText
                            name="weight"
                            type="number"
                            validationError="This field must be a number."
                            validations="isNumeric"
                            floatingLabelText="Weight"
                        />
                        <FormsyText
                            name="range"
                            type="number"
                            validationError="This field must be a number."
                            validations="isNumeric"
                            floatingLabelText="Range"
                        />
                        <div className="itemCheckbox">
                            <FormsyToggle
                                name="twoHanded"
                                label="Two Handed"/>
                        </div>
                </Formsy.Form>
            </Dialog>
        );
    }

    private enableSubmit() {
        this.setState({ canSubmit: true } as ICreateItemModalState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as ICreateItemModalState);
    }

    private submitForm(data) {
        this.disableSubmit();
        this.props.addItem(data);
        this.props.closeModal();
    }
}

export default CharacterItemModal;
