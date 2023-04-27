import { format } from 'date-fns';
import controllerModule from './controller';
import projectFactory from './projects';
import domTodoController from './domTodoController';
import { populateStorage } from './localstorage';


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
  }

  function domSwitchProject(e) {
    // dynamically set id when list item clicked

    // using currentTarget instead of target super important! when target used and paragraph clicked
    // target refered to paragraph even without handler. currentTarget refers to the node with
    // the event listener!

    e.currentTarget.dataset.id = e.currentTarget.lastChild.dataset.id;
    controllerModule.switchProject(e.currentTarget.dataset.id, controllerModule.projectsArray);
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
      e.stopPropagation();
      const renderedProject = document.querySelector('.active-project');

      if (controllerModule.projectsArray[e.target.dataset.id] === controllerModule.activeProject) {
        renderedProject.remove();
        renderedProject.rendered = false;
      }

      for (let i = 0; i < controllerModule.projectsArray.length; i += 1) {
        controllerModule.projectsArray[i].id = i;
      }

      controllerModule.removeProject(e.target.dataset.id, controllerModule.projectsArray);
      deleteButtonArray.splice(e.target.dataset.id, 1);
      e.target.parentNode.remove();
      populateStorage();

      setDeleteButtonsId();
    });
    return deleteProjectButton;
  };

  function createProjectListParagraph(project) {
    const listParagraph = document.createElement('p');

    listParagraph.textContent = project.title;

    return listParagraph;
  }

  function renderProjectList() {
    controllerModule.projectsArray.forEach((project) => {
      if (project.rendered === false) {
        const listItem = document.createElement('li');
        const listParagraph = createProjectListParagraph(project);
        const deleteProjectButton = createDeleteProjectButton(project);

        listItem.classList.add('category', 'project');

        listItem.addEventListener('click', (e) => {
          e.stopPropagation();
          domSwitchProject(e);
          renderProject(project);
          changeProjectParagraphColor(e.currentTarget);

          if (form.classList.contains('hidden')) form.classList.toggle('hidden');
        });

        projectsList.append(listItem);
        listItem.appendChild(listParagraph);
        listItem.appendChild(deleteProjectButton);

        project.rendered = true;
      }
    });
  }

  function renderProject(project) {
    const main = document.querySelector('.main');
    const currentRenderedProject = document.querySelector('.active-project');
    const newRenderedProject = document.createElement('div');
    const title = document.createElement('h2');

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
    if (!form.classList.contains('hidden')) form.classList.toggle('hidden');
  }

  function changeProjectParagraphColor(paragraph) {
    const paragraphs = document.querySelectorAll('.category');
    paragraphs.forEach((item) => {
      if (item.classList.contains('active')) {
        console.log(`${item}`);
        item.classList.remove('active');
      }
    });
    paragraph.classList.toggle('active');
    console.log(paragraphs);
  }

  projectTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addProjectButton.click();
    }
  });

  addProjectButton.addEventListener('click', () => {
    if (projectTitle.value === '') return;
    for (let i = 0; i < controllerModule.projectsArray.length; i += 1) {
      if (projectTitle.value === controllerModule.projectsArray[i].title) {
        console.log('Project with same title already exist');
        return;
      }
    }

    domCreateProject();
    renderProjectList();
    populateStorage();

    if (controllerModule.projectsArray.length === 1) {
      const li = document.querySelector('.category.project');
      li.classList.add('active');
    }

    if (form.classList.contains('hidden')) form.classList.toggle('hidden');
    addProjectButton.classList.toggle('hidden');
    projectTitle.classList.toggle('hidden');

    projectTitle.value = '';
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

  inboxButton.addEventListener('click', (e) => {
    renderInbox();
    changeProjectParagraphColor(e.target);
  });
  todayButton.addEventListener('click', (e) => {
    renderTodayTodos();
    changeProjectParagraphColor(e.target);
  });

  return {
    renderProjectList,
    renderProject,
  };
})();


export default domProjectController;


/*
local storage rearange project in numerical/alphavetical order. WHY?
*/
