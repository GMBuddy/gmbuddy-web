import * as React from "react";

import {ICharacterData } from "character-data/CharacterData";

class DetailsPage extends React.Component<ICharacterData, any> {
    public render() {
        let DETAILS_DOM = Object.keys(this.props.details).map((key) => {
            const value = this.props.details[key];
            const capitalKey = key.charAt(0).toUpperCase() + key.slice(1);

            return (<h3 className={key} key={key}><u>{capitalKey}</u>: {value}</h3>);
        });
        return(
            <div className="details">
                {DETAILS_DOM}
            </div>
        );
    }
}

export default DetailsPage;
