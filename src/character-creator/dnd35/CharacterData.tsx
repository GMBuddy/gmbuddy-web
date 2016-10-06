export interface ICharacterDetails {
    name: string;
    class: string;
    race: string;
    diety: string;
    alignment: string;
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

export interface ICharacterData {
    details: ICharacterDetails;
    stats: ICharacterStats;
    items: ICharacterItems;
}
