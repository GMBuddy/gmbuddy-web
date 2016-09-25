import * as React from "react";
import { AppBar, FlatButton } from "material-ui";

import { Link } from "react-router";

class NavBar extends React.Component<void, void> {
    public render() {
        return (
            <AppBar
                title="Quiz Application"
                iconElementRight={<FlatButton containerElement={<Link to="/about"/>} linkButton={true} label="about"/>}
            />
        );
    }
}

export default NavBar;
