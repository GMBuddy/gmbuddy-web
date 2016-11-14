import * as React from "react";

interface IStatsPageProps {
    stats: Object;
    modifiers: Object;
}

class StatsPage extends React.Component<IStatsPageProps, any> {
    public render() {
        const STATS_DOM = Object.keys(this.props.stats).map((key) => {
            const value = this.props.stats[key];
            const tinyName = key.substring(0, 3).toUpperCase();
            const modifier = Math.floor((this.props.stats[key] - 10) / 2);
            this.props.modifiers[tinyName] = modifier;
            return (
                <div className="abilityBox" key={key}>
                    <div className="abilityNameBox">
                        <div>
                            <p className="shortStatName">{tinyName}</p>
                            <p className="fullStatName">{key}</p>
                        </div>
                    </div>
                    <div className="abilityScoreBox">
                        <div><p>{value}</p></div>
                    </div>
                    <div className="abilityModBox">
                        <div><p>{modifier}</p></div>
                    </div>
                    <div className="abilityTempScore">
                        <div/>
                    </div>
                    <div className="abilityTempMod">
                        <div/>
                    </div>
                </div>);
        });

        return(
            <div className="stats">
                <div className="abilityHeaders">
                    <p className="abilityName">Ability Name</p>
                    <p>Ability<br/>Score</p>
                    <p>Ability<br/>Modifier</p>
                    <p>Temporary<br/>Score</p>
                    <p>Temporary<br/>Modifier</p>
                </div>
                <div className="abilityRows">
                    {STATS_DOM}
                </div>
            </div>
        );
    }
}

export default StatsPage;
