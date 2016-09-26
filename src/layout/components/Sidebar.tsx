import * as React from "react";
import { Drawer, MenuItem } from "material-ui";

interface ISidebarState {
    open?: boolean;
}

class Sidebar extends React.Component<void, ISidebarState> {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    public render() {
        return (
                <Drawer open={this.state.open}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
        );
    }
}

export default Sidebar;
