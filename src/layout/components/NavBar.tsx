import * as React from "react";
import { AppBar, FlatButton } from "material-ui";
import Sidebar from "./Sidebar";
import { Link, browserHistory } from "react-router";

interface INavBarProps {
    drawerOpen: boolean;
    toggleDrawer: () => void;
    closeDrawer: () => void;
    router: any;
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
                    iconElementRight={<FlatButton containerElement={<Link to="/login"/>} label="Login"/>}
                    onTitleTouchTap={this.goHome.bind(this)}
                />
                <Sidebar closeDrawer={this.props.closeDrawer} drawerOpen={this.props.drawerOpen}/>
            </div>
        );
    }
}

export default NavBar;
