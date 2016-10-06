import * as React from "react";
import { Drawer, MenuItem } from "material-ui";
import {Link} from "react-router";

interface ISidebarProps {
    drawerOpen: boolean;
    closeDrawer: () => any;
}

const menuItems = [
    {route: "/", text: "Home"},
    {route: "/about", text: "About"},
    {route: "/campaign/create", text: "Campaign Creator"},
    {route: "/character/create", text: "Character Creator"},
    {route: "/character/view", text: "Character Viewer"},
];

class Sidebar extends React.Component<ISidebarProps, void> {
    public render() {
        return (
                <Drawer
                    containerStyle={{height: "calc(100% - 64px)", top: 64}}
                    open={this.props.drawerOpen}>
                    {menuItems.map(item =>
                        <MenuItem
                            key={item.text}
                            containerElement={<Link to={item.route}/>}
                            onTouchTap={this.props.closeDrawer}>{item.text}</MenuItem>
                    )}
                </Drawer>
        );
    }
}

export default Sidebar;
