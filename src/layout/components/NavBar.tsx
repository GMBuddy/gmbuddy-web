import * as React from "react";
import { AppBar, FlatButton } from "material-ui";
import { Link } from "react-router";
import Sidebar from "./Sidebar";

interface INavBarState {
    drawerOpen: boolean;
}

class NavBar extends React.Component<void, INavBarState> {
    constructor(props: any) {
        super(props);
        this.state = { drawerOpen: false };
    }

    public toggleDrawer() {
        this.setState({ drawerOpen: !this.state.drawerOpen });
    }

    public render() {
        return (
            <div>
                <AppBar
                    title="Quiz Application"
                    onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
                    iconElementRight={<FlatButton containerElement={<Link to="/about"/>} label="about"/>}
                />
                <Sidebar drawerOpen={this.state.drawerOpen}/>
            </div>
        );
    }
}

export default NavBar;
