import * as React from "react";
import { Dialog, FlatButton } from "material-ui";
import Login from "../components/Login";

import * as Formsy from "formsy-react";

interface ILoginModalProps {
    open: boolean;
    closeModal: () => any;
}

interface ILoginModalState {
    isLoggingIn: boolean;
    canSubmit: boolean;
}

class LoginModal extends React.Component<ILoginModalProps, ILoginModalState> {
    private formsyForm;

    constructor() {
        super();
        this.state = {
            isLoggingIn: false,
            canSubmit: false,
        } as ILoginModalState;
    }

    private login(username, password) {
        this.setState({ isLoggingIn: true } as ILoginModalState);
        return
    }

    public render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.closeModal}
            />,
            <FlatButton
                label="Submit"
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
                    className="loginModal"
                    actions={actions}
                    title="Login Dialog"
                    modal={true}
                    open={this.props.open}>
                    <Formsy.Form
                        onValidSubmit={this.submitForm.bind(this)}
                        onValid={this.enableSubmit.bind(this)}
                        onInvalid={this.disableSubmit.bind(this)}
                        ref={(form) => {
                            this.formsyForm = form;
                        }}
                    >
                        <Login/>
                    </Formsy.Form>
                </Dialog>
        );
    }

    private enableSubmit() {
        this.setState({ canSubmit: true } as ILoginModalState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as ILoginModalState);
    }

    private submitForm(data) {
        // console.log("Login:", data);
        this.disableSubmit();
    }
}

export default LoginModal;
