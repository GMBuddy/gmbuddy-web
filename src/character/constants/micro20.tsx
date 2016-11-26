export const STATS = [
    "strength",
    "dexterity",
    "mind",
];

export const CLASSES = [
    "Fighter",
    "Rogue",
    "Magi",
    "Cleric",
];

export const RACES = [
    "Human",
    "Elf",
    "Dwarf",
    "Halfling",
];

export const SKILLS = [
    "physical",
    "subterfuge",
    "knowledge",
    "communication",
];

export const CLASSSKILLBONUS = {
    "fighter": {"physical": 3,
                "subterfuge": 0,
                "knowledge": 0,
                "communication": 0,
                },
    "rogue": {"physical": 0,
                "subterfuge": 3,
                "knowledge": 0,
                "communication": 0,
                },
    "magi": {"physical": 0,
                "subterfuge": 0,
                "knowledge": 3,
                "communication": 0,
                },
    "cleric": {"physical": 0,
                "subterfuge": 0,
                "knowledge": 0,
                "communication": 3,
                },
};

export const CASTSPELLS = {
    "fighter": "none",
    "rogue": "none",
    "magi": "arcane",
    "cleric": "divine",
};

export const ARCANESPELLS ={
    "lvl1": [
        "Mage Hand",
        "Surprise!",
    ],
    "lvl2": [
        "Boom",
        "Heal",
    ]
};

export const DIVINESPELLS ={
    "lvl1": [
        "Priest Hand",
        "Heal",
    ],
    "lvl2": [
        "Convert the Heathen",
        "Healer",
    ]
};
