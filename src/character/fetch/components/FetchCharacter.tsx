import * as React from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { fetchCharacter } from "../../actions/fetch/thunks";
import { connect } from "react-redux";
import Micro20CharacterViewer from "../../viewer/components/micro20/CharacterViewer";
import NotFound from "../../../layout/components/NotFound";

interface IFetchCharacterProps {
    character: any;
    characterId: string;
    dispatch: any;
    fromStore?: boolean;
    gameType: string;
    params: any;
    editable: boolean;
}

interface IFetchCharacterState {
    character: any;
    error: string;
    isFetching: boolean;
}

class FetchCharacter extends React.Component<IFetchCharacterProps, IFetchCharacterState> {
    constructor(props) {
        super(props);

        let finalState = { character: null, error: null, isFetching: false };

        if (!props.character && this.props.fromStore !== true) {
            finalState.isFetching = true;
        }

        this.state = finalState;
    }

    public render() {
        const spinner = () => {
            if (!this.state.isFetching) {
                return null;
            }

            return <LoadingSpinner />;
        };

        const character = () => {
            const characterData = this.props.character || this.state.character;

            if (characterData) {
                if (!this.state.isFetching ) {
                    if (characterData.gameType === "micro20") {
                        return <Micro20CharacterViewer character={characterData} editable={this.props.editable}/>;
                    } else {
                        return <NotFound/>;
                    }
                }
            }
        };

        return (
            <div>
                {spinner()}
                {character()}
            </div>
        );
    }

    /* tslint:disable */
    private componentDidMount() {
        if (this.props.fromStore !== true) {
            this.loadCharacterData(this.props.gameType, this.props.characterId);
        }
    }
    /* tslint:enable */

    private updateCharacterData(character) {
        this.setState({ character, isFetching: false } as IFetchCharacterState);
    }

    private loadCharacterData(gameType, characterId) {
        this.props.dispatch(fetchCharacter(gameType, characterId,
            (character) => this.updateCharacterData(character),
            (error) => this.setState({error} as IFetchCharacterState)));
    }
}

const mapStateToProps = (state, ownProps): Object => {
    const character = state.character[ownProps.characterId];

    if (character) {
        return { character };
    }

    return {};
};

export default connect(mapStateToProps)(FetchCharacter);
