import * as React from "react";
import { FormsyText } from "formsy-material-ui/lib";
import { ICharacterData } from "gmbuddy/micro20/character";
import { SKILLS, CLASSSKILLBONUS } from "../../../constants/micro20";

interface ICharacterSkillsProps extends ICharacterData {
    disabled?: boolean;
}
interface ICharacterSkillsState {
    totalBonuses: any;
}

const skillHeader =
    <div className="skillHeader">
        <div><p>Skill</p></div>
        <div className="rankHeadTitle"><p>Rank</p></div>
        <div><p>Class<br/>Bonus</p></div>
        <div><p>Level</p></div>
        <div><p>Total<br/>Bonus</p></div>
    </div>;

class CharacterSkills extends React.Component<ICharacterSkillsProps, ICharacterSkillsState> {

    private constructor(props) {
        super(props);
        this.state = { totalBonuses: {} };
        const classBonus = CLASSSKILLBONUS[this.props.details.class];
        SKILLS.map((skill) => {
            this.props.skills[skill].classBonus = classBonus[skill];
            this.props.skills[skill].rank = "0";
            this.props.skills[skill].level = this.props.details.level;
            this.props.skills[skill].totalBonus = classBonus[skill] + this.props.details.level;
            this.state.totalBonuses[skill] = this.props.skills[skill].totalBonus;
        });
    }

    public render() {
        const level = this.props.details.level;
        const skillsDom = SKILLS.map((skill) => {
            return  <div className="skillContainer" key={skill + "Container"}>
                <div className="skillLabel"><p>{skill}</p></div>
                <FormsyText
                    className="skillRank"
                    key={skill}
                    name={"skills." + skill + ".rank"}
                    floatingLabelText={"Ranks"}
                    type="number"
                    value={this.props.skills[skill].rank}
                    validations="isInt"
                    onChange={this.updateModifier.bind(this, skill, null)}
                />
                <div className="skillClassBonus">
                    <div><p>{this.props.skills[skill].classBonus}</p></div>
                </div>
                <div className="skillLevelBonus">
                    <div><p>{level}</p></div>
                </div>
                <div className="skillTotalBonus">
                    <div><p>{this.state.totalBonuses[skill]}</p></div>
                </div>
            </div>;
        });

        return (
            <section className="micro20CharacterSkills">
                {skillHeader}
                {skillsDom}
            </section>
        );
    }

    private updateModifier(skill: string, value: number, event) {
        if (skill) {
//            const trueValue = value || event.target.value || 0;
            this.props.skills[skill].rank = Number(event.target.value);

            this.props.skills[skill].totalBonus =
                Number(this.props.skills[skill].rank) +
                Number(this.props.skills[skill].classBonus) +
                Number(this.props.skills[skill].level);
            let newState = this.state.totalBonuses;
            newState[skill] = this.props.skills[skill].totalBonus;
            this.setState({totalBonuses: newState});
        }
    }
}

export default CharacterSkills;
