export interface ICharacterSkill {
    name: string;
    ability: string;
    untrained: boolean;
}

export interface ICharacterSkillList {
    skills: ICharacterSkill[];
}