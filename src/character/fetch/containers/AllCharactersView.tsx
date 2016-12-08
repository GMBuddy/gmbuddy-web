import * as React from "react";
import FetchCharacters from "../components/FetchCharacters";
import * as Formsy from "formsy-react";
import { FormsySelect } from "formsy-material-ui/lib";
import { MenuItem } from "material-ui";

interface IAllCharactersViewProps {
    params: any;
}
const gameTypes = [ "all", "micro20", "dnd35"];
class AllCharactersView extends React.Component<IAllCharactersViewProps, void> {
    private gameTypeMenu;

    private constructor (props) {
        super(props);
        this.props.params.selectedGame = "all";
        this.gameTypeMenu = this.generateMenuItems(gameTypes);
    }
    public render() {
        let gameDropDown = <section className="gameTypeSection">
            <Formsy.Form
                    className="campaignViewForm"
                >
                <FormsySelect
                        key={"gameTypeList"}
                        className="gameTypeDropDown"
                        autoComplete="off"
                        name={"gameType"}
                        floatingLabelText={"Game Type"}
                        value={this.props.params.selectedGame}
                        onChange={this.changeGameType.bind(this, null)}

                    >
                        <MenuItem primaryText=" "/>
                        {this.gameTypeMenu}
                </FormsySelect>
            </Formsy.Form>
        </section>;
        let gameType = this.props.params.selectedGame; 
        let characters;
        if (gameType === "all") {
            characters = gameTypes.map((game) => {
                if (game === "all") {
                    return;
                }
                return <FetchCharacters key={game} gameType={game}/>;
            });
        } else {
            characters = <FetchCharacters key={gameType} gameType={gameType}/>;
        }
        return <section className="CharacterViewAll">
            {gameDropDown}
            {characters}
        </section>;
    }
    private generateMenuItems(menuItems) {
        return menuItems.map((menuName, index) => {
            return <MenuItem key={index} value={menuName.toLowerCase()} primaryText={menuName} />;
        });
    }
    private changeGameType(value: string, event) {
        this.props.params.selectedGame = event.target.innerHTML;
        this.forceUpdate();
    }
}

export default AllCharactersView;
