import * as React from "react";
import { AppBar, FlatButton } from "material-ui";
import Sidebar from "./Sidebar";
import { browserHistory } from "react-router";

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

    public render() {
        return (
            <div>
                <AppBar
                    title="GMBuddy"
                    onLeftIconButtonTouchTap={this.props.toggleDrawer}
                    iconElementRight={
                        <FlatButton
                            onTouchTap={this.props.openLoginModal}
                            label="Login"/>}
                />
                <Sidebar closeDrawer={this.props.closeDrawer} drawerOpen={this.props.drawerOpen}/>
            </div>
        );
    }
}

export default NavBar;