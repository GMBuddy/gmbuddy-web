import * as React from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";

class MasterLayout extends React.Component<void, void> {
    public render() {
        return (
            <div>
                <NavBar/>
                <div className="content">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default MasterLayout;
