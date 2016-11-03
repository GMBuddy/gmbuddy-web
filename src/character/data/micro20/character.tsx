export interface ICharacterDetails {
    name: string;
    class: string;
    race: string;
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

export interface ICharacterItems {
    items: ICharacterItem[];
}

export interface ICharacterSkills{
    skills: Object;
}

export interface ICharacterSpell {
    level: number;
    type: string;
    name: string;
    description: string;
}

export interface ICharacterSpells {
    spells: ICharacterSpell[];
}

export interface ICharacterData {
    details: ICharacterDetails;
    items: ICharacterItems;
    skills: ICharacterSkills;
    spells: ICharacterSpells;
}
