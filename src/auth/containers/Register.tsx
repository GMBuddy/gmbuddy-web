import * as React from "react";
import { FlatButton } from "material-ui";

import * as Formsy from "formsy-react";
import { connect } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FormsyText } from "formsy-material-ui/lib";
import { register } from "../actions/thunks";
import { browserHistory } from "react-router";

interface IRegisterProps {
    dispatch: any;
    auth: any;
}

interface IRegisterState {
    canSubmit: boolean;
    error: string;
}

class Register extends React.Component<IRegisterProps, IRegisterState> {
    constructor() {
        super();
        this.state = {
            canSubmit: false,
            error: null,
        } as IRegisterState;
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

        return (
            <section className="registerContainer">
                {spinner()}
                <Formsy.Form
                    onValidSubmit={this.submitForm.bind(this)}
                    onValid={this.enableSubmit.bind(this)}
                    onInvalid={this.disableSubmit.bind(this)}
                    className={this.props.auth.isFetching ? "hidden" : ""}
                >
                    {errorMessage()}
                    <div className="registerForm">
                        <FormsyText
                            name="firstname"
                            required
                            hintText="Enter your first name."
                            floatingLabelText="First Name"
                        />
                        <FormsyText
                            name="lastname"
                            required
                            hintText="Enter your last name."
                            floatingLabelText="Last Name"
                        />
                        <FormsyText
                            name="username"
                            type="email"
                            required
                            hintText="Enter your email address."
                            floatingLabelText="Email"
                        />
                        <FormsyText
                            name="password"
                            type="password"
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
            </section>
        );
    }

    private enableSubmit() {
        this.setState({ canSubmit: true } as IRegisterState);
    }

    private disableSubmit() {
        this.setState({ canSubmit: false } as IRegisterState);
    }

    private submitForm(data) {
        this.props.dispatch(register(data,
                            () => browserHistory.push("/"),
                            (error) => this.setState({ error } as IRegisterState)));
        this.disableSubmit();
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return { auth };
}

export default connect(mapStateToProps)(Register);
