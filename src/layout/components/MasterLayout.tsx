import * as React from "react";
import { MuiThemeProvider } from "material-ui/styles";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface IMasterLayoutState {
    drawerOpen: boolean;
}

class MasterLayout extends React.Component<void, IMasterLayoutState> {
    constructor(props: any) {
        super(props);
        this.state = { drawerOpen: false };
    }

    public toggleDrawer() {
        this.setState({ drawerOpen: !this.state.drawerOpen });
    }

    public closeDrawer() {
        this.setState({ drawerOpen: false });
    }

    public render() {
        return (
            <MuiThemeProvider>
                <div>
                    <NavBar
                        drawerOpen={this.state.drawerOpen}
                        toggleDrawer={this.toggleDrawer.bind(this)}
                        closeDrawer={this.closeDrawer.bind(this)}/>
                    <div className="content">
                        {this.props.children}
                    </div>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default MasterLayout;
