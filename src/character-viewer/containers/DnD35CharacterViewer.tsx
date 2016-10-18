import * as React from "react";

import CharacterViewDnD35 from "../dnd35/containers/CharacterView";
interface IDnD35CharacterViewerProps {
    details: any;
    stats: any;
    skills: any;
    items: any;
}

interface IDnD35CharacterViewerState {}

class DnD35CharacterViewer extends React.Component<IDnD35CharacterViewerProps, IDnD35CharacterViewerState> {
    constructor() {
        super();
    }

    public render() {
        return (
            <div className="dnd35CharViewer">
                <CharacterViewDnD35 gametype="DnD35"
                    details={this.props.details}
                    stats={this.props.stats}
                    skills={this.props.skills}
                    items={this.props.items}/>
            </div>
        );
    }
}

export default DnD35CharacterViewer;
