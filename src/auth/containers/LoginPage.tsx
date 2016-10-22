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
    error: string;
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
    constructor() {
        super();
        this.state = {
            canSubmit: false,
            error: null,
        } as ILoginPageState;
    }

    public render() {
        const errorMessage = () => {
            if (!this.state.error) {
                return null;
            }

            return <p style={{color: "red"}}>ERROR: {this.state.error}</p>;
        };

        const spinner = () => {
            if (!this.props.auth.isFetching) {
                return null;
            }

            return <LoadingSpinner />;
        };

        return (<section className="loginPage">
                    {spinner()}
                    <Formsy.Form
                        onValidSubmit={this.submitForm.bind(this)}
                        onValid={this.enableSubmit.bind(this)}
                        onInvalid={this.disableSubmit.bind(this)}
                        className={this.props.auth.isFetching ? "hidden" : ""}
                    >
                        {errorMessage()}
                        <div className="loginForm">
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
                        </div>
                    </Formsy.Form>
                </section>);
    }

    private enableSubmit() {
        this.setState({ canSubmit: true } as ILoginPageState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as ILoginPageState);
    }

    private submitForm(data) {
        this.props.dispatch(login(data.username, data.password,
                            () => browserHistory.push("/"),
                            (error) => this.setState({ error } as ILoginPageState)));
        this.disableSubmit();
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return { auth };
}

export default connect(mapStateToProps)(LoginPage);
