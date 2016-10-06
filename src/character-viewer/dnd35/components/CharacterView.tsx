import * as React from "react";

import { Tabs, Tab, Table, TableHeader, TableRow, TableHeaderColumn,
    TableBody, TableRowColumn, Paper } from "material-ui";
import {ICharacterData } from "../CharacterData";

const STATS = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
];
interface ICharacterViewState {
    details: any;
    stats: any;
}
//IN HERE STEVE
class CharacterView extends React.Component<ICharacterData, ICharacterViewState>{
	constructor(props){
		super(props);
		this.state = {
			details:{}, stats:{},
		} as ICharacterViewState;
	}

	public render() {
		console.log("charview is here:");
		console.log(this.props);
		
		const DETAILS_DOM = Object.keys(this.props.details).map((key) =>{
			const value = this.props.details[key];
			const capitalKey = key.charAt(0).toUpperCase()+key.slice(1)
			return <h3><u>{capitalKey}</u>: {value}</h3>;
		});
		
		const STATS_DOM = Object.keys(this.props.stats).map((key) =>{
			const value = this.props.stats[key];
			const modifier = Math.floor((this.props.stats[key] - 10) / 2);

			return (
				<TableRow key={key} hoverable={true}>
					<TableRowColumn>{key.substring(0,3).toUpperCase()}: {value}</TableRowColumn>
                	<TableRowColumn>{modifier}</TableRowColumn>
                </TableRow>);
			

		});
		

		return( 
		<Paper>
			<div>
				<h1><u>Details</u></h1>
				{DETAILS_DOM}
			</div>
			<div>
				<h1><u>Stats</u></h1>
				<Table selectable={false}>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                        	<TableHeaderColumn>Stats</TableHeaderColumn>
                            <TableHeaderColumn>Modifier</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
						{STATS_DOM}
					</TableBody>
                </Table>
			</div>
		</Paper>
		);
	}
}


export default CharacterView;