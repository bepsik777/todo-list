import Todo from './todos';
import projectFactory from './projects';
import controllerModule from './controller';
import domProjectController, { domTodoController } from './dom-controller';

const domProjectControllerObject = domProjectController();
const domTodoControllerObject = domTodoController();
controllerModule.createProject(projectFactory, 'hello', controllerModule.projectsArray);
controllerModule.switchProject(0, controllerModule.projectsArray);
domProjectControllerObject.renderProjectList();
domProjectControllerObject.renderActiveProject();

const defaultTodo = controllerModule.createTodo(controllerModule.activeProject.todosArray, Todo, 'project one', 'this is project one', new Date(2023, 5, 5));
console.log(defaultTodo);
console.log(controllerModule.activeProject);




