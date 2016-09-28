import * as React from "react";
import * as Formsy from "formsy-react";
import { FormsyText } from "formsy-material-ui/lib";

interface ILoginProps {
    submit: () => void;
    setSubmit: (allowed: boolean) => void;
}

class Login extends React.Component<ILoginProps, any> {
    public render() {
        return (
            <Formsy.Form
                onValid=""
            >
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
            </Formsy.Form>
        );
    }
}

export default Login;