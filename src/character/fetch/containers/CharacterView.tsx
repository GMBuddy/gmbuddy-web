import * as React from "react";
import FetchCharacter from "../components/FetchCharacter";
import {connect} from "react-redux";

interface ICharacterViewProps {
    params: any;
    auth: any;
    character: any;
}

class CharacterView extends React.Component<ICharacterViewProps, void> {
    public render() {
        const { characterId, gameType } = this.props.params;

        let editable = false;

        if (this.props.character[characterId]) {
            editable = this.props.character[characterId].details.userId === this.props.auth.data.id;
        }

        return <FetchCharacter editable={editable} characterId={characterId} gameType={gameType}/>;
    }
}

function mapStateToProps(state) {
    const { auth, character } = state;
    return { auth, character };
}

export default connect(mapStateToProps)(CharacterView);
