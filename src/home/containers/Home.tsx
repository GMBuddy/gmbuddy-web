import * as React from "react";
import { RaisedButton, Paper } from "material-ui";

class Home extends React.Component<any, any> {
    public render() {
        return (
            <div className="home">
                <div className="hero-container">
                    <div className="hero-background"/>
                    <div className="hero">
                        <span/>
                        <Paper className="hero-content">
                            <h1>GMBuddy</h1>
                            <h2>Your favorite tabletop roleplaying games; now in your browser.</h2>
                            <RaisedButton
                                label="Start"
                                primary={true}/>
                        </Paper>
                        <span/>
                    </div>
                    <div className="hero-background-clear"/>
                    <div className="infoSection">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar, metus et pellentesque accumsan, lectus nulla tincidunt nulla, vel facilisis metus nunc quis lorem. Aliquam hendrerit nisl lorem, in mattis massa maximus in. Sed venenatis nulla vitae consectetur consequat. Praesent eu nisl quis sapien hendrerit blandit at suscipit dui. Nullam elementum a ante tincidunt laoreet. Suspendisse eget tortor libero. In pharetra hendrerit maximus. Ut pretium molestie leo id egestas. Quisque tristique lacinia metus, id luctus turpis auctor ac. Donec a urna nec tortor ullamcorper sagittis. Vestibulum eget sapien dolor.</p>
                    </div>

                </div>
            </div>
        );
    }
}

export default Home;
