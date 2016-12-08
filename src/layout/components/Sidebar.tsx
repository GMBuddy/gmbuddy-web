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
                {icon: <FontIcon className="material-icons">add_circle</FontIcon>,
                    route: "/campaign/create", text: "Campaign Creator"},
                {icon: <FontIcon className="material-icons">assignment</FontIcon>,
                    route: "/campaigns", text: "All Campaigns"},
                {icon: null, route: null, text: null},
                {icon: <FontIcon className="material-icons">add_circle</FontIcon>,
                    route: "/character/create", text: "Character Creator"},
                {icon: <FontIcon className="material-icons">assignment_ind</FontIcon>,
                    route: "/characters", text: "All Characters"},
                {icon: null, route: null, text: null},
                {icon: <FontIcon className="material-icons">settings</FontIcon>,
                    route: "/settings", text: "Settings"},
                {icon: <FontIcon className="material-icons">help</FontIcon>,
                    route: "/help", text: "Help"},
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
