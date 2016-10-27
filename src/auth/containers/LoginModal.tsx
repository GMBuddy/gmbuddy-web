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
    error: string;
}

class LoginModal extends React.Component<ILoginModalProps, ILoginModalState> {
    private formsyForm;

    constructor() {
        super();
        this.state = {
            canSubmit: false,
            error: null,
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

        const spinner = () => {
            if (!this.props.auth.isFetching) {
                return null;
            }

            return <LoadingSpinner />;
        };

        return (
                <Dialog
                    className="loginModal"
                    title="Login Dialog"
                    modal={true}
                    open={this.props.open}
                >
                    {spinner()}
                    <Formsy.Form
                        onValidSubmit={this.submitForm.bind(this)}
                        onValid={this.enableSubmit.bind(this)}
                        onInvalid={this.disableSubmit.bind(this)}
                        ref={ form => this.formsyForm = form }
                        className={this.props.auth.isFetching ? "hidden" : ""}
                    >
                        <Login error={this.state.error} />
                        <section className="loginFormButtons">{actions}</section>
                    </Formsy.Form>
                </Dialog>
        );
    }

    /* tslint:disable */
    private componentWillUpdate(nextProps) {
        if (nextProps.open && nextProps.auth.data && nextProps.auth.data.token) {
            nextProps.closeModal();
        }
    }
    /* tslint: enable */

    private enableSubmit() {
        this.setState({ canSubmit: true } as ILoginModalState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as ILoginModalState);
    }

    private submitForm(data) {
        this.props.dispatch(login(data.username, data.password,
                             null,
                            (error) => this.setState({ error } as ILoginModalState)));
        this.disableSubmit();
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return { auth };
}
export default connect(mapStateToProps)(LoginModal);
