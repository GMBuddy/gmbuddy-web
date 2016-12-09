/* Shared */

declare var __DEVTOOLS__: boolean;

declare let io: any;

interface Socket {
    on(event: string, callback: (data: any) => void );
    emit(event: string, data: any);
}

declare module "gmbuddy/campaign" {
    export interface ICampaign {
        campaignId: string;
        characters: any[];
        gameType: string;
        gmUserId: string;
        name: string;
    }

    export interface ICampaignData {
        gameType: string;
        name: string;
        campaignId: string;
    }
}

/* Generics */

declare module "gmbuddy/character" {
    export interface ICharacter {
        characterId?: number;
        gameType?: String;
        details: {
            characterId: string;
            name: string;
            userId: string;
        };
    }
}

/* D&D 3.5 */
declare module "gmbuddy/dnd35/character" {
    export interface ICharacterDetails {
        userId: string;
        campaignId: string;
        characterId: string;
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

    export interface ICharacterItems {
        items: ICharacterItem[];
    }

    export interface ICharacterSkills {
        skills: Object;
    }

    export interface ICharacterData {
        characterId?: number;
        gameType?: String;
        details: ICharacterDetails;
        stats: ICharacterStats;
        items: ICharacterItems;
        skills: ICharacterSkills;
    }
}

/* Microlite20 */
declare module "gmbuddy/micro20/character" {
    export interface ICharacterDetails {
        userId: string;
        campaignId: string;
        class: any;
        characterId: string;
        name: string;
        race: any;
        height: string;
        weight: string
        hairColor: string;
        eyeColor: string;
        el: number;
        level: number;
    }

    export interface ICharacterStats {
        strength: number;
        dexterity: number;
        mind: number;
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
    export interface ICharacterSkill {
        rank: number;
        classBonus: number;

    }
    export interface ICharacterSkills {
        communication: ICharacterSkill;
        knowledge: ICharacterSkill;
        physical: ICharacterSkill;
        subterfuge: ICharacterSkill;
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

    export interface ICharacterCalculated {
        health: number;
    }

    export interface ICharacterData {
        calculated: ICharacterCalculated;
        characterId?: number;
        gameType?: string;
        details: ICharacterDetails;
        baseStats: ICharacterStats;
        modifiers: ICharacterStats;
        spells: ICharacterSpells;
        skills: ICharacterSkills;
        items: ICharacterItems;
    }
}
