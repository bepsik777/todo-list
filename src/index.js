import Todo from './todos';
import projectFactory from './projects';
import controllerModule from './controller';
import domProjectController from './domProjectController';

const domProjectControllerObject = domProjectController();
controllerModule.createProject(projectFactory, 'hello', controllerModule.projectsArray);
controllerModule.switchProject(0, controllerModule.projectsArray);
const defaultTodo = controllerModule.createTodo(controllerModule.activeProject.todosArray, Todo, 'project one', 'this is project one', new Date(2023, 5, 5));
domProjectControllerObject.renderProjectList();
domProjectControllerObject.renderActiveProject();

console.log(defaultTodo);
console.log(controllerModule.activeProject);




