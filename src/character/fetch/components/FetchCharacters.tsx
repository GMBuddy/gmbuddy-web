import * as React from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { fetchCharacters } from "../../actions/fetch/thunks";
import { IDispatch } from "~redux-thunk~redux";
import { connect } from "react-redux";
import { ICharacterData } from "gmbuddy/micro20/character";
import Characters from "../../viewer/components/Characters";

interface IFetchCharactersProps {
    dispatch: IDispatch;
    gameType: string;
    params: any;
}

interface IFetchCharactersState {
    error: string;
    characters: ICharacterData[];
    isFetching: boolean;
}

class FetchCharacters extends React.Component<IFetchCharactersProps, IFetchCharactersState> {
    constructor(props) {
        super(props);

        let finalState = { characters: null, error: null, isFetching: false };
        finalState.isFetching = true;
        this.state = finalState;
    }

    public render() {
        const spinner = () => {
            if (!this.state.isFetching) {
                return null;
            }

            return <LoadingSpinner />;
        };

        const characters = () => {
            const charactersData = this.state.characters;

            if (charactersData) {
                if (!this.state.isFetching ) {
                    return <Characters gameType={this.props.gameType} characters={charactersData} />;
                }
            }
        };

        return (
            <div>
                {spinner()}
                {characters()}
            </div>
        );
    }

    /* tslint:disable */
    private componentDidMount() {
        this.loadCampaignsData(this.props.gameType);
    }
    /* tslint:enable */

    private loadCampaignsData(gameType) {
        this.props.dispatch(fetchCharacters(gameType,
            (characters) => {
                this.setState({ characters, isFetching: false } as IFetchCharactersState);
            },
            (error) => this.setState({error} as IFetchCharactersState)));
    }
}

const mapStateToProps = (state): Object => {
    if (state.character) {
        return { characters: state.character };
    }
};

export default connect(mapStateToProps)(FetchCharacters);
