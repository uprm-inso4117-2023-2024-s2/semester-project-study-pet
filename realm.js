import Realm from 'realm'

class Pet {
    static schema = {
        name: 'Pet',
        properties: {
            name: 'string',
            growthlvl: 'int',
            happiness: 'int',
            lastInteractionTime: 'date',
            careMistakes: 'int',
            pettype: 'string',
            images: 'list',
            sleepTime: 'string',
            isAsleep: 'bool',
        },
    };
}

const realm = new Realm({ schema: [Pet] });

export default realm;