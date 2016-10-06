import * as React from "react";

import { Paper } from "material-ui";
import DnD35CharacterViewer from "./DnD35CharacterViewer";
interface ICharacterViewerState{
	gameType; string;
	step:number;
};

class CharacterViewer extends React.Component<void, ICharacterViewerState> {
	constructor() {
		super();
		this.state = {} as ICharacterViewerState;
	}
	public render(){
		let currentCharacter = <DnD35CharacterViewer step={5}/>;
		return(
			<section>
				<Paper>
					{currentCharacter}
				</Paper>
			</section>
			);
	}
}

export default CharacterViewer;