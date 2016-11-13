export interface ICharacterDetails {
    name: string;
    class: string;
    race: string;
    alignment: string;
    deity: string;
    size: string;
    age: string;
    gender: string;
    height: string;
    weight: string;
    eyes: string;
    hair: string;
    skin: string;
}

export interface ICharacterStats {
    stats: Object;
}

export interface ICharacterItem {
    type: string;
    name: string;
    damageDieAmount: number;
    damageDie: number;
    damageType: string;
    twoHands: boolean;
    weight: number;
    range: number;
}

export interface ICharacterSkills{
    skills: Object;
}
export interface ICharacterItems {
    items: ICharacterItem[];
}

export interface ICharacterData {
    details: ICharacterDetails;
    stats: ICharacterStats;
    items: ICharacterItems;
    skills: ICharacterSkills;
}
