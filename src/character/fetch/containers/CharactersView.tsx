import * as React from "react";
import FetchCharacters from "../components/FetchCharacters";

interface ICharactersViewProps {
    params: any;
}

class CharactersView extends React.Component<ICharactersViewProps, void> {
    public render() {
        const { gameType } = this.props.params;

        return <FetchCharacters gameType={gameType}/>;
    }

}

export default CharactersView;
