import { format } from 'date-fns';
import controllerModule from './controller';
import projectFactory from './projects';
import domTodoController from './domTodoController';


const domProjectController = () => {
  const addProjectButton = document.getElementById('create-project-button');
  const createProjectButton = document.querySelector('.add-project');
  const projectTitle = document.getElementById('project-title');
  const projectsList = document.querySelector('.projects-list');
  const createTodoButton = document.querySelector('.create-todo-button');
  const deleteButtonArray = [];
  const inboxButton = document.querySelector('.category.inbox');
  const todayButton = document.querySelector('.category.today');

  function domCreateProject() {
    const titleValue = projectTitle.value;
    controllerModule.createProject(projectFactory, titleValue, controllerModule.projectsArray);

    console.log(controllerModule.projectsArray);
  }

  function domSwitchProject(e) {
    // dynamically set id when list item clicked
    e.target.dataset.id = e.target.nextSibling.dataset.id;
    controllerModule.switchProject(e.target.dataset.id, controllerModule.projectsArray);
    console.log(controllerModule.activeProject);
  }

  function setDeleteButtonsId() {
    // push button to button array, and button index is the same as coresponding project index
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
      const renderedProject = document.querySelector('.active-project');

      if (controllerModule.projectsArray[e.target.dataset.id] === controllerModule.activeProject) {
        renderedProject.remove();
      }
      controllerModule.removeProject(e.target.dataset.id, controllerModule.projectsArray);
      deleteButtonArray.splice(e.target.dataset.id, 1);
      e.target.parentNode.remove();

      setDeleteButtonsId();
      console.log(controllerModule.projectsArray);
    });
    return deleteProjectButton;
  };

  function createProjectListParagraph(project) {
    const listParagraph = document.createElement('p');
    listParagraph.textContent = project.title;
    listParagraph.addEventListener('click', (e) => {
      domSwitchProject(e);
      renderProject(project);
      console.log(controllerModule.activeProject);
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

  function renderProject(project) {
    // const project = controllerModule.activeProject;
    const main = document.querySelector('.main');
    const currentRenderedProject = document.querySelector('.active-project');
    const newRenderedProject = document.createElement('div');
    const title = document.createElement('h2');
    // console.log(currentRenderedProject);
    if (currentRenderedProject !== null) {
      currentRenderedProject.remove();
    }
    if (controllerModule.activeProject === undefined) return;
    newRenderedProject.classList.add('active-project');
    title.textContent = controllerModule.activeProject.title;
    title.classList.add('rendered-project-title');

    main.appendChild(newRenderedProject);
    newRenderedProject.appendChild(title);

    domTodoController.renderTodos(project);
  }

  function renderInbox() {
    const allTodos = {
      todosArray: [],
    };
    controllerModule.projectsArray.forEach((project) => {
      allTodos.todosArray.push(...project.todosArray);
    });
    console.log(allTodos);
    renderProject(allTodos);
    // const editButtons = document.querySelectorAll('.edit-button');
    // const deleteButtons = document.querySelectorAll('.delete-todo-button');
    // editButtons.forEach((button) => button.remove());
    // deleteButtons.forEach((button) => button.remove());
  }

  function renderTodayTodos() {
    const allTodos = [];
    const todayTodos = {
      todosArray: [],
    };
    const todayDate = format(new Date(), 'MMM/dd/yyyy');
    controllerModule.projectsArray.forEach((project) => {
      allTodos.push(...project.todosArray);
    });
    allTodos.forEach((todo) => {
      if (todo.dueDate === todayDate) todayTodos.todosArray.push(todo);
    });
    console.log(todayTodos.todosArray);
    renderProject(todayTodos);
  }

  addProjectButton.addEventListener('click', () => {
    if (projectTitle.value === '') return;
    domCreateProject();
    projectTitle.value = '';
    renderProjectList();

    addProjectButton.classList.toggle('hidden');
    projectTitle.classList.toggle('hidden');
  });

  createProjectButton.addEventListener('click', () => {
    addProjectButton.classList.toggle('hidden');
    projectTitle.classList.toggle('hidden');
  });

  createTodoButton.addEventListener('click', (e) => {
    e.preventDefault();
    domTodoController.domCreateTodo();
    renderProject(controllerModule.activeProject);
  });

  inboxButton.addEventListener('click', renderInbox);
  todayButton.addEventListener('click', renderTodayTodos);

  return {
    renderProjectList,
    renderActiveProject: renderProject,
  };
};


export default domProjectController;


/*
Inbox and Today renders, but all the edit, deleteButton and expand buttons bugs, because the rerender
the active project, and inbox and today are not projects, therefore they don't change the active project
(actually it is the case for delete and edit buttons, i don't know yet why expand button don't show
information on non active project todos.)
The title does not change, but that should be easy to fix

*/
