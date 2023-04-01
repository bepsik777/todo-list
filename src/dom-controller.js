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
  const deleteButtonArray = [];

  function setDeleteButtonsId() {
    const allButtons = document.querySelectorAll('.delete-project-button');
    allButtons.forEach((button) => {
      button.dataset.id = deleteButtonArray.indexOf(button);
    });
  }

  const createDeleteProjectButton = () => {
    const deleteProjectButton = document.createElement('button');
    deleteButtonArray.push(deleteProjectButton);
    deleteProjectButton.textContent = 'Delete';
    deleteProjectButton.classList.add('delete-project-button');
    deleteProjectButton.dataset.id = deleteButtonArray.indexOf(deleteProjectButton);

    deleteProjectButton.addEventListener('click', (e) => {
      controllerModule.removeProject(e.target.dataset.id, controllerModule.projectsArray);
      deleteButtonArray.splice(e.target.dataset.id, 1);
      e.target.parentNode.remove();
      setDeleteButtonsId();
      console.log(controllerModule.projectsArray);
      console.log(e.target.dataset.id);
    });
    return deleteProjectButton;
  };

  function renderProjectList() {
    controllerModule.projectsArray.forEach((project) => {
      if (project.rendered === false) {
        const listItem = document.createElement('li');
        const listParagraph = document.createElement('p');
        const deleteProjectButton = createDeleteProjectButton(project);

        listParagraph.textContent = project.title;

        projectsList.append(listItem);
        listItem.appendChild(listParagraph);
        listItem.appendChild(deleteProjectButton);

        project.rendered = true;
      }
    });
  }

  const domCreateProject = () => {
    const titleValue = projectTitle.value;
    controllerModule.createProject(projectFactory, titleValue, controllerModule.projectsArray);

    console.log(controllerModule.projectsArray);
  };

  // const domSwitchProject


  addProjectButton.addEventListener('click', () => {
    domCreateProject();
    renderProjectList();

    addProjectButton.classList.toggle('hidden');
    projectTitle.classList.toggle('hidden');
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
WHAT I HAVE:
- I CAN CREATE PROJECTS BY CLICKING ON THE ADD BUTTON, AND THE TITLE IS TAKEN FROM THE INPUT
- THE INPUT HIDES WHEN PROJECT CREATED, AND SHOWS WHE 'CREATE PROJECTS'
- THE POSSIBILITY TO DELETE PROJECTS BY CLICKING A BUTTON

NEXT STEPS:
- ADD THE POSSIBILITY TO DELETE PROJECTS BY CLICKING A BUTTON
- SHOULD I REFACTOR MY CODE? SHOULD THE PROJECT OBJECT HAVE A 'RENDERED' PROPERTIE,
WHICH IS ASSOCIATED TO THE DOM?
*/
