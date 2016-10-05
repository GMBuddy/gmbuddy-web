import * as React from "react";
import { FormsyText } from "formsy-material-ui/lib";

interface ILoginProps {
    submit: () => void;
    setSubmit: (allowed: boolean) => void;
}

class Login extends React.Component<ILoginProps, any> {
    public render() {
        return (
            <section className="loginModalContent">
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
