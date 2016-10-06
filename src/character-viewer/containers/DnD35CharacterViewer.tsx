import * as React from "react";

import CharacterViewDnD35 from "../dnd35/components/CharacterView";
interface IDnD35CharacterViewerProps {
    step: number;
}

interface IDnD35CharacterViewerState {
    dnd35data: any;
    data: any;
}

class DnD35CharacterViewer extends React.Component<IDnD35CharacterViewerProps, IDnD35CharacterViewerState>{
	constructor(){
		super();
		this.state = {
			data:{ 
				details : {"name":"Steve the Wizard","class":"Sorcerer", "level":"3","race":"Human","diety":"Kord","alignment":"Chaotic Neutral"}, 
				stats:{"Strength":7,"Dexterity":14,"Constitution":16,"Intelligence":10,"Wisdom":15,"Charisma":18},
				skills:{},
			},
		} as IDnD35CharacterViewerState;
	}

	public render() {
		let steps = <CharacterViewDnD35 gametype="DnD35" data={this.state.data}/>;
		return (
			<div className="dnd35CharViewer">
				{steps}
			</div>
		);
	}
}


export default DnD35CharacterViewer;