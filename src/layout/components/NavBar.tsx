import * as React from "react";
import { AppBar, FlatButton } from "material-ui";
import Sidebar from "./Sidebar";

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
        const loginLabel = loggedIn ? `Logout of ${auth.data.username}` : "Login";
        const loginClick = loggedIn ? this.logout.bind(this) : this.props.openLoginModal;

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

    private logout() {
        this.props.logout();
    }
}

export default NavBar;
