import * as React from "react";
import FetchCharacter from "../components/FetchCharacter";

interface ICharacterViewProps {
    params: any;
}

class CharacterView extends React.Component<ICharacterViewProps, void> {
    public render() {
        const { characterId, gameType } = this.props.params;

        return <FetchCharacter characterId={characterId} gameType={gameType}/>;
    }
}

export default CharacterView;
