import * as React from "react";
import { Card, CardActions, CardHeader, FlatButton } from "material-ui";
import { Link } from "react-router";
import {ICharacter} from "gmbuddy/character";

interface ICharactersProps {
    characters: ICharacter[];
    gameType: string;
}

class Characters extends React.Component<ICharactersProps, void> {
    public render() {
        let characters;

        if (this.props.characters) {
            characters = Object.keys(this.props.characters).map((key) => {
                const character: ICharacter = this.props.characters[key];
                const {name, userId, characterId} = character.details;

                return (
                    <Card key={characterId}>
                        <CardHeader
                            title={name}
                            subtitle={`Created by: ${userId}`}
                        />
                        <CardActions>
                            <FlatButton
                                label="View"
                                containerElement={<Link to={`/${this.props.gameType}/characters/${characterId}`}/>}
                            />
                        </CardActions>
                    </Card>);
            });
        }

        return (
            <div className="characters">
                <h2>Here are all of the '{this.props.gameType}' characters:</h2>
                {characters}
            </div>
        );
    }
}

export default Characters;
