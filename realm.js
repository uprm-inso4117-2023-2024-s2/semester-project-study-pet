import Realm from 'realm'

class Pet extends Realm.Object{
    static schema = {
        name: 'Pet',
        properties: {
            name: 'string',
            growthlvl: 'int',
            happiness: 'int',
            lastInteractionTime: 'date',
            careMistakes: 'int',
            pettype: 'string',
            images: {type: 'list', objectType: 'string'},
            sleepTime: 'string',
            isAsleep: 'bool',
        },
    };
}

const realm = new Realm({ schema: [Pet] });

export default realm;