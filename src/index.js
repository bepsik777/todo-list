import Todo from './todos';
import projectFactory from './projects';
import controlerModule from './controler';


controlerModule.createProject(projectFactory, 'default project');
console.log(controlerModule.projectsArray);
