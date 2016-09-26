import * as React from "react";
import { MuiThemeProvider } from "material-ui/styles";
import NavBar from "./NavBar";
import Footer from "./Footer";

class MasterLayout extends React.Component<void, void> {
    public render() {
        return (
            <MuiThemeProvider>
                <div>
                    <NavBar/>
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
