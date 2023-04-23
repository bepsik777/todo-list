import { format } from 'date-fns';
import controllerModule from './controller';
import projectFactory from './projects';
import domTodoController from './domTodoController';
import { addToStorage } from './localstorage';


const domProjectController = (() => {
  const addProjectButton = document.getElementById('create-project-button');
  const createProjectButton = document.querySelector('.add-project');
  const projectTitle = document.getElementById('project-title');
  const projectsList = document.querySelector('.projects-list');
  const createTodoButton = document.querySelector('.create-todo-button');
  const deleteButtonArray = [];
  const inboxButton = document.querySelector('.category.inbox');
  const todayButton = document.querySelector('.category.today');
  const form = document.querySelector('.create-todo');


  function domCreateProject() {
    const titleValue = projectTitle.value;
    controllerModule.createProject(projectFactory, titleValue, controllerModule.projectsArray);

    // for (let i = 0; i < controllerModule.projectsArray.length; i += 1) {
    //   addToStorage(i, controllerModule.projectsArray[i]);
    // }

    console.log(controllerModule.projectsArray);
    console.log(localStorage);
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
        renderedProject.rendered = false;
      }
      localStorage.removeItem(controllerModule.projectsArray[e.target.dataset.id].title);
      controllerModule.removeProject(e.target.dataset.id, controllerModule.projectsArray);
      deleteButtonArray.splice(e.target.dataset.id, 1);
      e.target.parentNode.remove();

      setDeleteButtonsId();
      console.log(controllerModule.projectsArray);
      console.log(localStorage);
    });
    return deleteProjectButton;
  };

  function createProjectListParagraph(project) {
    const listParagraph = document.createElement('p');
    listParagraph.textContent = project.title;
    listParagraph.addEventListener('click', (e) => {
      domSwitchProject(e);
      renderProject(project);
      if (form.classList.contains('hidden')) form.classList.toggle('hidden');
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
    const title = document.querySelector('.rendered-project-title');
    title.textContent = 'Inbox';
    if (!form.classList.contains('hidden')) form.classList.toggle('hidden');
    console.log(form.classList);
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
    const title = document.querySelector('.rendered-project-title');
    title.textContent = 'Today';
  }

  addProjectButton.addEventListener('click', () => {
    if (projectTitle.value === '') return;
    domCreateProject();
    projectTitle.value = '';
    renderProjectList();
    controllerModule.projectsArray.forEach((project) => {
      addToStorage(project.title, project);
    });

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
    renderProject,
  };
})();


export default domProjectController;


/*

*/
