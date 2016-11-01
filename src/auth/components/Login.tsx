import * as React from "react";
import { FormsyText } from "formsy-material-ui/lib";

interface ILoginProps {
    error: string;
}

class Login extends React.Component<ILoginProps, any> {
    public render() {
        let errorMessage;

        if (this.props.error) {
           errorMessage = <p style={{color: "red"}}>ERROR: {this.props.error}</p>;
        }

        return (
            <section className="loginModalContent">
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
            </section>
        );
    }
}

export default Login;
