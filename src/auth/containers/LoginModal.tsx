import * as React from "react";
import { Dialog, FlatButton } from "material-ui";
import Login from "../components/Login";

interface ILoginModalProps {
    open: boolean;
    closeModal: () => any;
}

class LoginModal extends React.Component<ILoginModalProps, any> {
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
                disabled={true}
                onTouchTap={this.props.closeModal}
            />,
        ];

        return (
            <Dialog
                actions={actions}
                title="Login Dialog"
                modal={true}
                open={this.props.open}>
                <Login/>
            </Dialog>
        );
    }
}

export default LoginModal;
