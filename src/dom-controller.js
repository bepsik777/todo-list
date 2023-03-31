import controllerModule from './controller';
// import Todo from './todos';
import projectFactory from './projects';


// function render(array, element, whereToAppend) {
//   array.forEach((item, element) => {
//     if (item.rendered === false) {
//       const newElement = document.createElement(element);
//       newElement.textContent = item.title;

//       whereToAppend.appendChild(newElement);
//     }
//   });
// }


const domController = () => {
  const addProjectButton = document.getElementById('create-project-button');
  const createProjectButton = document.querySelector('.add-project');
  const projectTitle = document.getElementById('project-title');
  const projectsList = document.querySelector('.projects-list');

  const renderProjectList = () => {
    controllerModule.projectsArray.forEach((project) => {
      if (project.rendered === false) {
        const listItem = document.createElement('li');
        listItem.textContent = project.title;
        projectsList.append(listItem);
        project.rendered = true;
      }
    });
  };

  const domCreateProject = () => {
    const titleValue = projectTitle.value;
    controllerModule.createProject(projectFactory, titleValue, controllerModule.projectsArray);
    renderProjectList();


    console.log(controllerModule.projectsArray);
  };

  // const domRemoveProject

  // const domSwitchProject


  addProjectButton.addEventListener('click', (e) => {
    domCreateProject();
    e.target.classList.toggle('hidden');
    e.target.previousElementSibling.classList.toggle('hidden');
  });

  createProjectButton.addEventListener('click', () => {
    addProjectButton.classList.toggle('hidden');
    projectTitle.classList.toggle('hidden');
  });

  return {
    renderProjectList,
  };
};
export default domController;

/*
WHAT I CAN DO:
- I CAN CREATE PROJECTS BY CLICKING ON THE ADD BUTTON, AND THE TITLE IS TAKEN FROM THE INPUT
- THE INPUT HIDES WHEN PROJECT CREATED, AND SHOWS WHE 'CREATE PROJECTS'

NEXT STEPS:
- ADD THE POSSIBILITY TO DELETE PROJECTS BY CLICKING A BUTTON
- SHOULD I REFACTOR MY CODE? SHOULD THE PROJECT OBJECT HAVE A 'RENDERED' PROPERTIE,
WHICH IS ASSOCIATED TO THE DOM?
*/
