import * as React from "react";
import { Divider, Drawer, MenuItem } from "material-ui";
import { IndexLink } from "react-router";
import { connect } from "react-redux";
import Menu from "material-ui/svg-icons/navigation/menu";
import FontIcon from "material-ui/FontIcon";

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
            {icon: null, route: "/", text: "Home"},
            {icon: null, route: "/about", text: "About"},
            {icon: null, route: null, text: null},
            {icon: <FontIcon className="material-icons">settings</FontIcon>, route: "/settings", text: "Settings"},
            {icon: <FontIcon className="material-icons">help</FontIcon>, route: "/help", text: "Help"},
        ];

        if (loggedIn) {
            menuItems = [
                {icon: null, route: "/", text: "Home"},
                {icon: null, route: "/about", text: "About"},
                {icon: null, route: null, text: null},
                {icon: null, route: "/campaign/create", text: "Campaign Creator"},
                {icon: null, route: "/dnd35/campaigns", text: "All D&D 3.5 Campaigns"},
                {icon: null, route: "/micro20/campaigns", text: "All Microlite20 Campaigns"},
                {icon: null, route: null, text: null},
                {icon: null, route: "/character/create", text: "Character Creator"},
                {icon: null, route: "/character/view", text: "Character Viewer"},
                {icon: null, route: null, text: null},
                {icon: <FontIcon className="material-icons">settings</FontIcon>, route: "/settings", text: "Settings"},
                {icon: <FontIcon className="material-icons">help</FontIcon>, route: "/help", text: "Help"},
            ];
        }

        return (
                <Drawer
                    open={this.props.drawerOpen}
                    docked={false}>
                    <MenuItem
                        onTouchTap={this.props.closeDrawer}
                        className="sidebarTitle"
                        primaryText="GMBuddy"
                        leftIcon={<Menu />} />
                    {menuItems.map((item, index) => {
                            if (typeof item.route === "string") {
                                return <MenuItem
                                            leftIcon={item.icon}
                                            key={index}
                                            containerElement={<IndexLink to={item.route} activeClassName="active"/>}
                                            onTouchTap={this.props.closeDrawer}>{item.text}</MenuItem>;
                            } else {
                                return <section key={index} className="sidebarDiv"><Divider /></section>;
                            }
                        }
                    )}
                </Drawer>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Sidebar);
