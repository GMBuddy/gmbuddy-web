import * as React from "react";

import CharacterViewDnD35 from "./dnd35/CharacterView";
interface IDnD35CharacterViewerProps {
    data: any;
}

interface IDnD35CharacterViewerState {}

class DnD35CharacterViewer extends React.Component<IDnD35CharacterViewerProps, IDnD35CharacterViewerState> {
    public render() {
        return (
            <section className="dnd35CharViewer">
                <CharacterViewDnD35 gametype="DnD35"
                    details={this.props.data.details}
                    stats={this.props.data.stats}
                    skills={this.props.data.skills}
                    items={this.props.data.items}/>
            </section>
        );
    }
}

export default DnD35CharacterViewer;
