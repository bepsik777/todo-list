import { format } from 'date-fns';
import Todo from './todos';
import projectFactory from './projects';
import controllerModule from './controller';
import domProjectController from './domProjectController';

const domProjectControllerObject = domProjectController();
controllerModule.createProject(projectFactory, 'hello', controllerModule.projectsArray);
controllerModule.createProject(projectFactory, 'project two', controllerModule.projectsArray);
controllerModule.switchProject(0, controllerModule.projectsArray);
controllerModule.createTodo(controllerModule.activeProject.todosArray, Todo, 'todo one', 'this is project one', format(new Date(2023, 5, 5), 'MMM/dd/yyyy'));
controllerModule.createTodo(controllerModule.projectsArray[1].todosArray, Todo, 'todo two', 'this is project one', format(new Date(2023, 5, 5), 'MMM/dd/yyyy'));
domProjectControllerObject.renderProjectList();
domProjectControllerObject.renderActiveProject(controllerModule.activeProject);




