import * as React from "react";
import { MuiThemeProvider } from "material-ui/styles";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import LoginModal from "../../auth/containers/LoginModal";

interface IMasterLayoutState {
    drawerOpen: boolean;
    loginModalOpen: boolean;
}

class MasterLayout extends React.Component<void, IMasterLayoutState> {
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
                        drawerOpen={this.state.drawerOpen}
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

    protected openLoginModal() {
        this.closeDrawer();
        this.setState({ drawerOpen: this.state.drawerOpen, loginModalOpen: true });
    }

    protected closeLoginModal() {
        this.setState({ drawerOpen: this.state.drawerOpen, loginModalOpen: false });
    }

    protected toggleDrawer() {
        this.setState({ drawerOpen: !this.state.drawerOpen, loginModalOpen: this.state.loginModalOpen });
    }

    protected closeDrawer() {
        this.setState({ drawerOpen: false, loginModalOpen: this.state.loginModalOpen });
    }
}

export default MasterLayout;