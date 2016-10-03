export interface ICharacterDetails {
    name: string;
}

export interface ICharacterStats {
    stats: any[];
}

export interface ICharacterData {
    details: ICharacterDetails;
    stats: ICharacterStats;
}

export interface ICharacterDataContainer {
    data: ICharacterData;
}
