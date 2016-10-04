export interface ICharacterDetails {
    name: string;
}

export interface ICharacterStats {
    stats: Object;
}

export interface ICharacterData {
    details: ICharacterDetails;
    stats: ICharacterStats;
}
