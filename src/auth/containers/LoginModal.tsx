import * as React from "react";
import { Dialog, FlatButton } from "material-ui";
import Login from "../components/Login";

import * as Formsy from "formsy-react";
import { connect } from "react-redux";
import { login } from "../actions/thunks";
import LoadingSpinner from "../../components/LoadingSpinner";

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
                key="cancel"
                label="Cancel"
                primary={true}
                onTouchTap={this.props.closeModal}
            />,
            <FlatButton
                key="submit"
                label="Submit"
                primary={true}
                disabled={!this.state.canSubmit}
                type="submit"
                onTouchTap={() => {
                  this.formsyForm.submit();
                }}
            />,
        ];

        let loginForm = <LoadingSpinner />;

        if (!this.props.auth.isFetching) {
            loginForm = <Formsy.Form
                        onValidSubmit={this.submitForm.bind(this)}
                        onValid={this.enableSubmit.bind(this)}
                        onInvalid={this.disableSubmit.bind(this)}
                        ref={ form => this.formsyForm = form }
                    >
                        <Login error={this.props.auth.error} />
                        <section className="loginFormButtons">{actions}</section>
                    </Formsy.Form>;
        }

        return (
                <Dialog
                    className="loginModal"
                    title="Login Dialog"
                    modal={true}
                    open={this.props.open}>
                    {loginForm}
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
        // console.log("Submit: ", data);
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
