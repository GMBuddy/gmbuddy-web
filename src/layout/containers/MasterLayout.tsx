import * as React from "react";
import { MuiThemeProvider } from "material-ui/styles";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import LoginModal from "../../auth/containers/LoginModal";
import { connect } from "react-redux";
import {logout} from "../../auth/actions/thunks";
import { IDispatch } from "~redux-thunk~redux";

interface IMasterLayoutProps {
    auth: any;
    dispatch: IDispatch;
}

interface IMasterLayoutState {
    drawerOpen: boolean;
    loginModalOpen: boolean;
}

class MasterLayout extends React.Component<IMasterLayoutProps, IMasterLayoutState> {
    constructor(props: any) {
        super(props);
        this.state = { drawerOpen: false, loginModalOpen: false };
    }

    public render() {
        return (
            <MuiThemeProvider>
                <div>
                    <LoginModal open={this.state.loginModalOpen} closeModal={this.closeLoginModal.bind(this)}/>
                    <NavBar
                        auth={this.props.auth}
                        drawerOpen={this.state.drawerOpen}
                        logout={this.logout.bind(this)}
                        toggleDrawer={this.toggleDrawer.bind(this)}
                        closeDrawer={this.closeDrawer.bind(this)}
                        openLoginModal={this.openLoginModal.bind(this)}/>
                    <div className="content">
                        {this.props.children}
                    </div>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }

    openLoginModal() {
        this.closeDrawer();
        this.setState({ loginModalOpen: true } as IMasterLayoutState);
    }

    closeLoginModal() {
        this.setState({ loginModalOpen: false } as IMasterLayoutState);
    }

    logout() {
        this.props.dispatch(logout());
    }

    toggleDrawer() {
        this.setState({ drawerOpen: !this.state.drawerOpen } as IMasterLayoutState);
    }

    closeDrawer() {
        this.setState({ drawerOpen: false } as IMasterLayoutState);
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}


export default connect(mapStateToProps)(MasterLayout);
