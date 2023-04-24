import controllerModule from './controller';
import domProjectController from './domProjectController';
import { fetchProjectsFromStorage, isStorageSupported } from './localstorage';


if (isStorageSupported(window, 'localStorage')) {
  fetchProjectsFromStorage();
}

if (controllerModule.projectsArray.length !== 0) controllerModule.switchProject(0, controllerModule.projectsArray);
domProjectController.renderProject(controllerModule.projectsArray[0]);
domProjectController.renderProjectList();

