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
    authData: any;
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
        const loggedIn = !!this.props.authData.token;
        const loginLabel = loggedIn ? `Logout of ${this.props.authData.username}` : "Login";
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

function mapStateToProps(state) {
    return { authData: state.auth.data };
}

export default connect(mapStateToProps)(NavBar);
