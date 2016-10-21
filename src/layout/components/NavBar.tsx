import * as React from "react";
import { AppBar, FlatButton } from "material-ui";
import Sidebar from "./Sidebar";
import {browserHistory} from "react-router";

interface INavBarProps {
    auth: any;
    closeDrawer: () => void;
    drawerOpen: boolean;
    logout: () => void;
    openLoginModal: () => void;
    router: any;
    toggleDrawer: () => void;
    dispatch: any;
}

class NavBar extends React.Component<INavBarProps, void> {
    public render() {
        const { auth } = this.props;

        const loggedIn =  !auth.isFetching && auth.error === null && !!auth.data.token;
        const loginClick = loggedIn ? this.logout.bind(this) : this.props.openLoginModal;

        let buttons = <FlatButton className="navbarButton" label={`Logout of ${auth.data.username}`} onTouchTap={loginClick}/>;

        if (!loggedIn) {
            buttons = <section>
                        <FlatButton className="navbarButton" label="Login" onTouchTap={loginClick} />
                        <FlatButton className="navbarButton" label="Register" onTouchTap={this.register.bind(this)}/>
                      </section>;
        }

        return (
            <div>
                <AppBar
                    title="GMBuddy"
                    onLeftIconButtonTouchTap={this.props.toggleDrawer}
                >
                    {buttons}
                </AppBar>
                <Sidebar closeDrawer={this.props.closeDrawer} drawerOpen={this.props.drawerOpen}/>
            </div>
        );
    }

    private register() {
        browserHistory.push("/register");
    }

    private logout() {
        this.props.logout();
    }
}

export default NavBar;
