import * as React from "react";
import { AppBar, FlatButton } from "material-ui";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { logout, loginWithData } from "../../auth/actions/thunks";

interface INavBarProps {
    closeDrawer: () => void;
    drawerOpen: boolean;
    openLoginModal: () => void;
    router: any;
    toggleDrawer: () => void;
    auth: any;
    dispatch: any;
}

class NavBar extends React.Component<INavBarProps, void> {
    componentDidMount() {
        const { username, token } = JSON.parse(localStorage.getItem('authData'));

        if(username && token) {
            this.props.dispatch(loginWithData(username, token))
        }
    }

    public render() {
        const { auth } = this.props;
        const loggedIn =  !auth.isRunning && auth.error === null && !!auth.data.token;
        const loginLabel = loggedIn ? `Logout of ${auth.data.username}` : "Login";
        const loginClick = loggedIn ? this.logout.bind(this) : this.props.openLoginModal;

        return (
            <div>
                <AppBar
                    title="GMBuddy"
                    onLeftIconButtonTouchTap={this.props.toggleDrawer}
                    iconElementRight={<FlatButton label={loginLabel} onTouchTap={loginClick} />}
                />
                <Sidebar closeDrawer={this.props.closeDrawer} drawerOpen={this.props.drawerOpen}/>
            </div>
        );
    }

    private logout() {
        this.props.dispatch(logout());
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(NavBar);
