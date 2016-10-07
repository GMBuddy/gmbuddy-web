import * as React from "react";
import { Dialog, FlatButton, CircularProgress } from "material-ui";
import Login from "../components/Login";

import * as Formsy from "formsy-react";
import { connect } from "react-redux";
import { login } from "../thunks";

interface ILoginModalProps {
    dispatch: any;
    open: boolean;
    closeModal: () => any;
    login: (username: string, password: string) => any;
    auth: any;
}

interface ILoginModalState {
    canSubmit: boolean;
}

class LoginModal extends React.Component<ILoginModalProps, ILoginModalState> {
    private formsyForm;

    constructor() {
        super();
        this.state = {
            auth: {},
            canSubmit: false,
        } as ILoginModalState;
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

        let form = <CircularProgress />;

        if (!this.props.auth.isRunning) {
            form = <Formsy.Form
                        onValidSubmit={this.submitForm.bind(this)}
                        onValid={this.enableSubmit.bind(this)}
                        onInvalid={this.disableSubmit.bind(this)}
                        ref={(form) => {
                            this.formsyForm = form;
                        }}
                    >
                        <Login/>
                    </Formsy.Form>;
        }

        return (
                <Dialog
                    className="loginModal"
                    actions={actions}
                    title="Login Dialog"
                    modal={true}
                    open={this.props.open}>
                    {JSON.stringify(this.props.auth)}>
                    {form}
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
        console.log("Submit: ", data);
        this.props.dispatch(login(data.username, data.password));
        this.disableSubmit();
    }
}


function mapStateToProps(state) {
    const { auth } = state;

    // Close the modal if the user is logged in.
    if (auth.data.token) {
        this.props.closeModal();
    }

    return { auth };
}
export default connect(mapStateToProps)(LoginModal);
