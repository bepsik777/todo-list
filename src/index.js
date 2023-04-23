import controllerModule from './controller';
import domProjectController from './domProjectController';


if (localStorage.length !== 0) {
  const array = [];
  console.log(localStorage);
  const obj = JSON.parse(JSON.stringify(localStorage));
  console.log(obj);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      console.log(JSON.parse(obj[key]));
      array.push(JSON.parse(obj[key]));
    }
  }
  array.forEach((project) => {
    controllerModule.projectsArray.push(project);
    project.rendered = false;
  });
}
if (controllerModule.projectsArray.length !== 0) controllerModule.switchProject(0, controllerModule.projectsArray);
domProjectController.renderProject(controllerModule.projectsArray[0]);
domProjectController.renderProjectList();

