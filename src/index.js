import controllerModule from './controller';
import domProjectController from './domProjectController';
import { fetchProjectsFromStorage, isStorageSupported } from './localstorage';



if (isStorageSupported(window, 'localStorage')) {
  fetchProjectsFromStorage();
}

if (controllerModule.projectsArray.length !== 0) controllerModule.switchProject(0, controllerModule.projectsArray);
domProjectController.renderProject(controllerModule.projectsArray[0]);
domProjectController.renderProjectList();


const ul = document.querySelectorAll('.category.project');
console.log(ul);

// if there are projects in local storage, change the color of first project to active
if (ul[0]) {
  ul[0].classList.toggle('active');
}

if (!ul[0]) {
  const form = document.querySelector('.create-todo');
  form.classList.toggle('hidden');
}
