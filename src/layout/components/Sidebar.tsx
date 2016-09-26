import * as React from "react";
import { Drawer, MenuItem } from "material-ui";

interface ISidebarProps {
    drawerOpen: boolean;
}

class Sidebar extends React.Component<ISidebarProps, void> {
    public render() {
        return (
                <Drawer
                    containerStyle={{height: "calc(100% - 64px)", top: 64}}
                    open={this.props.drawerOpen}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
        );
    }
}

export default Sidebar;
