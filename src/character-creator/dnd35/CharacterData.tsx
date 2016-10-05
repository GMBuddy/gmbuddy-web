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

export interface ICharacterData {
    details: ICharacterDetails;
    stats: ICharacterStats;
}
