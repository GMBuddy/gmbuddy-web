import * as React from "react";
import FetchCampaigns from "../components/FetchCampaigns";
import * as Formsy from "formsy-react";
import { FormsySelect } from "formsy-material-ui/lib";
import { MenuItem } from "material-ui";

interface IAllCampaignsProps {
    params: any;
}

const gameTypes = [ "all", "micro20", "dnd35"];

class AllCampaignsView extends React.Component<IAllCampaignsProps, void> {
    private gameTypeMenu;

    private constructor (props) {
        super(props);
        this.props.params.selectedGame = "all";
        this.gameTypeMenu = this.generateMenuItems(gameTypes);
    }
    public render() {
        console.log(this.props);
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
                        onChange={this.changeCampaign.bind(this, null)}

                    >
                        <MenuItem primaryText=" "/>
                        {this.gameTypeMenu}
                </FormsySelect>
            </Formsy.Form>
        </section>;
        let gameType = this.props.params.selectedGame;
        let campaigns;
        if (gameType === "all") {
            campaigns = gameTypes.map((game) => {
                if (game === "all") {
                    return;
                }
                return <FetchCampaigns key={game} gameType={game}/>;
            });
        } else {
            campaigns = <FetchCampaigns key={gameType} gameType={gameType}/>;
        }
        return <section className="CampaignViewAll">
            {gameDropDown}
            {campaigns}
        </section>;
    }
    private generateMenuItems(menuItems) {
        return menuItems.map((menuName, index) => {
            return <MenuItem key={index} value={menuName.toLowerCase()} primaryText={menuName} />;
        });
    }
    private changeCampaign(value: string, event) {
        this.props.params.selectedGame = event.target.innerHTML;
        this.forceUpdate();
    }
}

export default AllCampaignsView;
