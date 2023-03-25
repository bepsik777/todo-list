import todoFactory from './todo-factory';

const firstTodo = todoFactory('finish project', 'it is a todo app', '01-02-2030', '01-01-1111', 3);

firstTodo.sayThis();
