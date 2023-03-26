import Todo from './todos';
import projectFactory from './projects';
import controllerModule from './controller';



const defaultProject = controllerModule.createProject(projectFactory, 'hello', controllerModule.projectsArray);
controllerModule.switchProject(defaultProject);

const defaultTodo = controllerModule.createTodo(controllerModule.activeProject.todosArray, Todo, 'project one', 'this is project one', new Date(2023, 5, 5), new Date(), 2);
console.log(defaultTodo);


/*

What do i have:
- a controler module
    * I refactored the controler module, now it consists of smaller modules, trying to
    keep the single responsibility and composition over inheritance in mind
- a projectFactory
- a totoFactory

What do i need?:
- try to create Date objects where there need to be dates in the todos
(probably new Date, but also the library mentioned on th TOP page)

- create basic UI with html and css

*/
