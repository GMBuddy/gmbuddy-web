import * as React from "react";

import {ICharacterData } from "character-data/dnd35/CharacterData";

class DetailsPage extends React.Component<ICharacterData, any> {
    public render() {
        let DETAILS_DOM = Object.keys(this.props.details).map((key) => {
            let value = this.props.details[key];
            value = value.charAt(0).toUpperCase() + value.slice(1);
            const capitalKey = key.charAt(0).toUpperCase() + key.slice(1);
            let className = "detailDiv" + capitalKey;
            return (<div className={className} key={key}>
                        <p>{value}</p>
                        <p className="detailLabel">{capitalKey}</p>
                    </div>);
        });
        return(
            <div className="details">
                {DETAILS_DOM}
            </div>
        );
    }
}

export default DetailsPage;
