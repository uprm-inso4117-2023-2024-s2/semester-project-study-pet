import Realm from 'realm'

class User {}
User.schema = {
    name: 'User',
    properties: {
        name: 'string',
        pets: 'Pet[]',
        exams: 'Exam[]'
    }
};

const realm = new Realm({schema: [User]});

export default realm;