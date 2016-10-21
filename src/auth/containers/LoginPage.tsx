import * as React from "react";
import { FlatButton } from "material-ui";

import * as Formsy from "formsy-react";
import { connect } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import { login } from "../actions/thunks";
import { FormsyText } from "formsy-material-ui/lib";
import {browserHistory} from "react-router";

interface ILoginPageProps {
    dispatch: any;
    open: boolean;
    closeModal: () => any;
    login: (username: string, password: string) => any;
    auth: any;
}

interface ILoginPageState {
    canSubmit: boolean;
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
    constructor() {
        super();
        this.state = {
            auth: {},
            canSubmit: false,
        } as ILoginPageState;
    }

    public render() {
        let loginForm = <LoadingSpinner />;
        let errorMessage;

        if (this.props.auth.error) {
            errorMessage = <p style={{color: "red"}}>ERROR: {this.props.auth.error}</p>;
        }

        if (!this.props.auth.isFetching) {
            loginForm = <Formsy.Form
                            onValidSubmit={this.submitForm.bind(this)}
                            onValid={this.enableSubmit.bind(this)}
                            onInvalid={this.disableSubmit.bind(this)}
                        >
                            {errorMessage}
                            <FormsyText
                                name="username"
                                required
                                hintText="Enter your username."
                                floatingLabelText="Username"
                            />
                            <FormsyText
                                name="password"
                                type="password"
                                required
                                hintText="Enter your password."
                                floatingLabelText="Password"
                            />
                            <FlatButton
                                key="submit"
                                label="Submit"
                                primary={true}
                                disabled={!this.state.canSubmit}
                                type="submit"
                            />
                        </Formsy.Form>;
        }

        return (<section className="loginPage">
                    {loginForm}
                </section>);
    }

    private enableSubmit() {
        this.setState({ canSubmit: true } as ILoginPageState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as ILoginPageState);
    }

    private submitForm(data) {
        console.log("LoginPage: ", data);
        // Redirect to home on successful login
        this.props.dispatch(login(data.username, data.password, () => browserHistory.push("/")));
        this.disableSubmit();
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return { auth };
}

export default connect(mapStateToProps)(LoginPage);
