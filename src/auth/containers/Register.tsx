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
    open: boolean;
    closeModal: () => any;
    login: (username: string, password: string) => any;
    auth: any;
}

interface IRegisterState {
    canSubmit: boolean;
}

class Register extends React.Component<IRegisterProps, IRegisterState> {
    constructor() {
        super();
        this.state = {
            auth: {},
            canSubmit: false,
        } as IRegisterState;
    }

    public render() {
        let registerForm = <LoadingSpinner />;
        let errorMessage;

        if (this.props.auth.error) {
            errorMessage = <p style={{color: "red"}}>ERROR: {this.props.auth.error}</p>;
        }

        if (!this.props.auth.isFetching) {
            registerForm = <Formsy.Form
                onValidSubmit={this.submitForm.bind(this)}
                onValid={this.enableSubmit.bind(this)}
                onInvalid={this.disableSubmit.bind(this)}
            >
                {errorMessage}
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

        return (
            <section className="registerContainer">
                {registerForm}
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
        console.log("Register: ", data);
        this.props.dispatch(register(data, () => browserHistory.push("/")));
        this.disableSubmit();
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return { auth };
}

export default connect(mapStateToProps)(Register);
