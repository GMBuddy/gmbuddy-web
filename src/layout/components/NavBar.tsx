import * as React from "react";
import { AppBar, FlatButton } from "material-ui";
import Sidebar from "./Sidebar";
import { browserHistory } from "react-router";
import { connect } from "react-redux";

interface INavBarProps {
    closeDrawer: () => void;
    drawerOpen: boolean;
    openLoginModal: () => void;
    router: any;
    toggleDrawer: () => void;
}

class NavBar extends React.Component<INavBarProps, void> {
    public goHome() {
        browserHistory.push("/");
    }

    private login() {
        console.log("login");
    }

    private logout() {
        console.log("logout");
    }

    public render() {
        const loggedIn = false;
        const loginLabel = loggedIn ? "Logout" : "Login";
        const loginClick = loggedIn ? this.logout : this.props.openLoginModal;

        return (
            <div>
                <AppBar
                    title="GMBuddy"
                    onLeftIconButtonTouchTap={this.props.toggleDrawer}
                    iconElementRight={<FlatButton label={loginLabel} onTouchTap={loginClick} />}
                />
                <Sidebar closeDrawer={this.props.closeDrawer} drawerOpen={this.props.drawerOpen}/>
            </div>
        );
    }
}

export default connect()(NavBar);
