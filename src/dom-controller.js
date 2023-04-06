import controllerModule from './controller';
// import Todo from './todos';
import projectFactory from './projects';


const domProjectController = () => {
  const addProjectButton = document.getElementById('create-project-button');
  const createProjectButton = document.querySelector('.add-project');
  const projectTitle = document.getElementById('project-title');
  const projectsList = document.querySelector('.projects-list');
  const deleteButtonArray = [];

  function domCreateProject() {
    const titleValue = projectTitle.value;
    controllerModule.createProject(projectFactory, titleValue, controllerModule.projectsArray);
    projectTitle.value = '';

    console.log(controllerModule.projectsArray);
  }

  function domSwitchProject(e) {
    e.target.dataset.id = e.target.nextSibling.dataset.id;
    controllerModule.switchProject(e.target.dataset.id, controllerModule.projectsArray);
    console.log(controllerModule.activeProject.title);
  }

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
    });
    return deleteProjectButton;
  };

  function createProjectListParagraph(project) {
    const listParagraph = document.createElement('p');
    listParagraph.textContent = project.title;
    listParagraph.addEventListener('click', (e) => {
      domSwitchProject(e);
      renderActiveProject(e);
    });
    return listParagraph;
  }

  function renderProjectList() {
    controllerModule.projectsArray.forEach((project) => {
      if (project.rendered === false) {
        const listItem = document.createElement('li');
        const listParagraph = createProjectListParagraph(project);
        const deleteProjectButton = createDeleteProjectButton(project);


        projectsList.append(listItem);
        listItem.appendChild(listParagraph);
        listItem.appendChild(deleteProjectButton);

        project.rendered = true;
      }
    });
  }

  function renderActiveProject() {
    const projectTitleH2 = document.querySelector('.project-title-h2');
    projectTitleH2.textContent = controllerModule.activeProject.title;
  }


  addProjectButton.addEventListener('click', () => {
    if (projectTitle.value === '') return;
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

const domTodoController = () => {
  const titleInput = document.querySelector('#title');
  const descriptionInput = document.querySelector('#descriptiom');
  const endDateInput = document.querySelector('#end-date');
  const createTodoButton = document.querySelector('.create-todo-button');



  // function domCreateTodo(e) => {

  // }


  createTodoButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(new Date(endDateInput.value));
  });
  return {

  };
};

export default domProjectController;
export { domTodoController };


/*
Next step:
- make a function to create a todo and attach it to the createTodoButton
*/
