import * as React from "react";
import { MenuItem } from "material-ui";
import { FormsyText, FormsySelect } from "formsy-material-ui/lib";
import { ICharacterData } from "gmbuddy/micro20/character";

interface ICharacterDetailsContProps extends ICharacterData {
    disabled?: boolean;
}

class CharacterDetailsCont extends React.Component<ICharacterDetailsContProps, any> {
    public render() {
        return (
            <section className="micro20CharacterDetailsCont">
                <div>
                    <FormsyText
                        autoComplete="off"
                        name="calculated.health"
                        floatingLabelText="Character Health (required)"
                        value={this.props.calculated.health}
                        disabled={this.props.disabled === true}
                        required
                    />
                </div>
            </section>
        );
    }
}

export default CharacterDetailsCont;
