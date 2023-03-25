import Todo from './todos';
import projectFactory from './projects';
import controlerModule from './controler';


const defaultProject = controlerModule.createProject(projectFactory, 'default project');

controlerModule.switchProject(defaultProject);

console.log(controlerModule.projectsArray);
console.log(controlerModule.activeProject);

