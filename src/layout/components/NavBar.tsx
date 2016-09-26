import * as React from "react";
import { AppBar, FlatButton } from "material-ui";
import { Link } from "react-router";
import Sidebar from "./Sidebar";

class NavBar extends React.Component<void, void> {
    public render() {
        return (
            <div>
                <AppBar
                    title="Quiz Application"
                    iconElementRight={<FlatButton containerElement={<Link to="/about"/>} label="about"/>}
                />
                <Sidebar/>
            </div>
        );
    }
}

export default NavBar;
