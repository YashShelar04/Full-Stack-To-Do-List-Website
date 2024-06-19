import { v4 as uuidv4 } from 'uuid';

const TodoSchema = {
    _id: { type: 'string', default: uuidv4 },
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
    todos: { type: 'array', default: [] },
    isLoggedIn: { type: 'boolean', default: false }
};

export default TodoSchema;
