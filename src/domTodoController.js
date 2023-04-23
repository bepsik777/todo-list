import { format } from 'date-fns';
import controllerModule from './controller';
import Todo from './todos';
import { addToStorage } from './localstorage';


const domTodoController = (() => {
  const titleInput = document.querySelector('#title');
  const descriptionInput = document.querySelector('#description');
  const endDateInput = document.querySelector('#end-date');
  //   const createTodoButton = document.querySelector('.create-todo-button');
  const priorityInput = document.querySelector('#priority');
  const deleteTodoButtonArray = [];



  function domCreateTodo() {
    const actProjectContainer = controllerModule.activeProject.todosArray;
    const title = titleInput.value;
    const description = descriptionInput.value;
    const date = format(new Date(endDateInput.value), 'MMM/dd/yyyy');
    const priority = priorityInput.value;



    controllerModule.createTodo(actProjectContainer, Todo, title, description, date, priority);

    console.log(controllerModule.projectsArray);
    for (let i = 0; i < controllerModule.projectsArray.length; i += 1) {
      console.log(localStorage);
      console.log(controllerModule.projectsArray);


      controllerModule.projectsArray.forEach((project) => {
        addToStorage(project.title, project);
      });

      console.log(localStorage);
      console.log(controllerModule.projectsArray);
    }
    console.log(controllerModule.projectsArray);
  }

  function createDeleteTodoButton() {
    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.textContent = 'X';
    deleteTodoButton.classList.add('delete-todo-button');
    deleteTodoButtonArray.push(deleteTodoButton);
    deleteTodoButton.dataset.id = deleteTodoButtonArray.indexOf(deleteTodoButton);

    deleteTodoButton.addEventListener('click', (e) => {
      e.target.dataset.id = e.target.parentElement.parentElement.dataset.id; // dynamically set id
      const buttonId = e.target.dataset.id;
      controllerModule.activeProject.todosArray.splice(buttonId, 1);
      renderTodos(controllerModule.activeProject);

      controllerModule.projectsArray.forEach((project) => {
        addToStorage(project.title, project);
      });

      console.log(e.target.dataset.id);
    });

    return deleteTodoButton;
  }

  function expandTodo(e, todo) {
    const todoWrapper = e.target.parentElement.parentElement;
    todoWrapper.classList.toggle('active-todo');
    if (todoWrapper.classList.contains('active-todo') === true) {
      const descriptionWrapper = document.createElement('div');
      const description = document.createElement('p');
      const priorityWrapper = document.createElement('div');
      descriptionWrapper.classList.add('description');
      priorityWrapper.classList.add('priority-wrapper');

      description.textContent = todo.description;
      priorityWrapper.textContent = todo.priority;

      todoWrapper.append(descriptionWrapper);
      todoWrapper.append(priorityWrapper);
      descriptionWrapper.append(description);
    } else if (todoWrapper.classList.contains('active-todo') === false) {
      const descriptionWrapper = document.querySelector('.description');
      const priorityWrapper = document.querySelector('.priority-wrapper');

      descriptionWrapper.remove();
      priorityWrapper.remove();
    }
  }

  function editTodo(e, project, todo) {
    const todoWrapper = e.target.parentElement.parentElement;

    const expandButton = todoWrapper.querySelector('.expand-button');
    todoWrapper.classList.toggle('edited-todo');
    if (todoWrapper.classList.contains('edited-todo')) {
      // get some of the existing elemnts, to replace them after
      const editButton = todoWrapper.querySelector('.edit-button');
      const domTodoTitle = todoWrapper.querySelector('.todo-title');
      const domTodoDate = todoWrapper.querySelector('.date-paragraph');

      // create the new elements, to be able to edit todo
      const editTitleField = document.createElement('input');
      editTitleField.type = 'text';
      editTitleField.maxLength = 32;
      editTitleField.value = todo.title;

      const editDescriptionField = document.createElement('textarea');
      editDescriptionField.classList.add('edit-description');
      editDescriptionField.value = todo.description;
      editDescriptionField.maxLength = 150;

      const editPriorityField = document.createElement('select');
      editPriorityField.classList.add('edit-priority');
      const lowOption = document.createElement('option');
      lowOption.value = 'Low';
      lowOption.textContent = 'Low';
      const mediumOption = document.createElement('option');
      mediumOption.value = 'Medium';
      mediumOption.textContent = 'Medium';
      const highOption = document.createElement('option');
      highOption.value = 'High';
      highOption.textContent = 'High';
      editPriorityField.append(lowOption, mediumOption, highOption);

      const editDueDateField = document.createElement('input');
      editDueDateField.type = 'date';
      console.log(new Date(todo.dueDate));
      console.log(format(new Date(todo.dueDate), 'yyyy-MM-dd'));
      editDueDateField.value = format(new Date(todo.dueDate), 'yyyy-MM-dd');

      const saveButton = document.createElement('button');
      saveButton.textContent = 's';
      saveButton.addEventListener('click', () => {
        controllerModule.editTodo(todo, editTitleField.value, editDescriptionField.value, format(new Date(editDueDateField.value), 'MMM/dd/yyyy'), editPriorityField.value);
        renderTodos(project);
        controllerModule.projectsArray.forEach((prj) => {
          addToStorage(prj.title, project);
        });
      });

      expandButton.disabled = true;


      todoWrapper.append(editDescriptionField, editPriorityField);
      domTodoTitle.replaceWith(editTitleField);
      editButton.replaceWith(saveButton);
      domTodoDate.replaceWith(editDueDateField);
    } else if (!todoWrapper.classList.contains('edited-todo')) {
      expandButton.disabled = false;
    }
  }

  function createExpandButton(todo) {
    const expandButton = document.createElement('button');
    expandButton.textContent = '↓';
    expandButton.classList.add('expand-button');

    expandButton.addEventListener('click', (e) => {
      // dynamically set id
      e.target.dataset.id = e.target.parentElement.parentElement.dataset.id;
      expandTodo(e, todo);
    });
    return expandButton;
  }

  function createEditButton(project, todo) {
    const editButton = document.createElement('button');
    editButton.textContent = 'e';
    editButton.classList.add('edit-button');

    editButton.addEventListener('click', (e) => {
      console.log('hello, i am edit piath');
      editTodo(e, project, todo);
    });

    return editButton;
  }

  function renderTodos(project) {
    const renderedTodos = document.querySelectorAll('.example-todo');
    renderedTodos.forEach((todo) => {
      todo.remove();
    });
    const renderedProject = document.querySelector('.active-project');
    project.todosArray.forEach((todo) => {
      const todoWrapper = document.createElement('div');
      const checkBoxWrapper = document.createElement('div');
      const checkBox = document.createElement('input');
      const todoTitle = document.createElement('h3');
      const dueDate = document.createElement('p');
      const iconsContainer = document.createElement('div');
      const deleteTodoButton = createDeleteTodoButton();
      const editButton = createEditButton(project, todo);
      const expandButton = createExpandButton(todo);

      todoWrapper.classList.add('example-todo');
      todoWrapper.dataset.id = controllerModule.activeProject.todosArray.indexOf(todo);
      todoWrapper.dataset.projectId = controllerModule.projectsArray.indexOf(project);
      checkBoxWrapper.classList.add('check-container');
      todoTitle.classList.add('todo-title');
      iconsContainer.classList.add('icons-container');
      dueDate.classList.add('date-paragraph');

      checkBox.id = 'finished';
      checkBox.type = 'checkbox';
      checkBox.name = 'checkbox';
      if (todo.finished === 'yes') checkBox.checked = true;
      if (todo.finished === 'no') checkBox.checked = false;
      checkBox.addEventListener('click', () => {
        if (checkBox.checked === true) {
          todo.finished = 'yes';
        } else if (checkBox.checked === false) {
          todo.finished = 'no';
        }
      });

      todoTitle.textContent = todo.title;
      dueDate.textContent = todo.dueDate;

      renderedProject.append(todoWrapper);
      todoWrapper.append(checkBoxWrapper, todoTitle, dueDate, iconsContainer);
      checkBoxWrapper.append(checkBox);
      iconsContainer.append(deleteTodoButton);
      iconsContainer.append(editButton);
      iconsContainer.append(expandButton);
    });
  }




  return {
    renderTodos,
    domCreateTodo,
  };
})();

export default domTodoController;


