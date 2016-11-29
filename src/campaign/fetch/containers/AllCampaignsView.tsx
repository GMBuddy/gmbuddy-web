import * as React from "react";
import FetchCampaigns from "../components/FetchCampaigns";
import * as Formsy from "formsy-react";
import { FormsySelect } from "formsy-material-ui/lib";
import { MenuItem } from "material-ui";

interface ICampaignsProps {
    params: any;
}
interface ICampaignsState {
    gameType: string;
}
const gameTypes = [ "all", "micro20", "dnd35"];

class AllCampaignsView extends React.Component<ICampaignsProps, ICampaignsState> {
    private gameTypeMenu;

    private constructor (props) {
        super(props);
        this.state = {gameType: "all"} as ICampaignsState;
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
                        value={this.state.gameType}
                        type="string"
                        onChange={this.changeCampaign.bind(this, null)}

                    >
                        <MenuItem primaryText=" "/>
                        {this.gameTypeMenu}
                </FormsySelect>
            </Formsy.Form>
        </section>;
        let gameType = this.state.gameType;
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
        let newState = {gameType: event.target.innerHTML};
        this.setState(newState);
    }
}

export default AllCampaignsView;
