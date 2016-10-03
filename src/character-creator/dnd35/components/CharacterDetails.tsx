import * as React from "react";
import { FormsyText } from "formsy-material-ui/lib";
import { ICharacterData} from "../CharacterData";

class CharacterDetails extends React.Component<ICharacterData, any> {
    public render() {
        return (
            <section className="designForm">
                <FormsyText
                    name="details.name"
                    floatingLabelText="Character Name"
                    required
                    value={this.props.details.name}
                />
            </section>
        );
    }
}

export default CharacterDetails;
