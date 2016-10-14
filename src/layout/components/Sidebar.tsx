import * as React from "react";
import { Drawer, MenuItem } from "material-ui";
import { Link } from "react-router";
import { connect } from "react-redux";

interface ISidebarProps {
    auth: any;
    dispatch: any;
    drawerOpen: boolean;
    closeDrawer: () => any;
}

class Sidebar extends React.Component<ISidebarProps, void> {
    public render() {
        const { auth } = this.props;
        const loggedIn = !auth.isRunning && auth.error === null && !!auth.data.token;

        let menuItems = [
            {route: "/", text: "Home"},
            {route: "/about", text: "About"},
        ];

        if (loggedIn) {
            menuItems = [
                {route: "/", text: "Home"},
                {route: "/about", text: "About"},
                {route: "/campaign/create", text: "Campaign Creator"},
                {route: "/character/create", text: "Character Creator"},
            ];
        }

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

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Sidebar);
