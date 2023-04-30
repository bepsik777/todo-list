import { format } from 'date-fns';
import controllerModule from './controller';
import { todoFactory } from './factories';
import { populateStorage } from './localstorage';


const domTodoController = (() => {
  const titleInput = document.querySelector('#title');
  const descriptionInput = document.querySelector('#description');
  const endDateInput = document.querySelector('#end-date');
  const priorityInput = document.querySelector('#priority');
  const deleteTodoButtonArray = [];



  function domCreateTodo() {
    const actProjectContainer = controllerModule.activeProject.todosArray;
    const title = titleInput.value;
    const description = descriptionInput.value;
    const date = format(new Date(endDateInput.value), 'MMM/dd/yyyy');
    const priority = priorityInput.value;

    controllerModule.createTodo(actProjectContainer, todoFactory, title, description, date, priority);

    populateStorage();
  }

  function createDeleteTodoButton() {
    const deleteTodoButton = document.createElement('button');
    const trashBinIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="humbleicons hi-trash"><path xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l.934 13.071A1 1 0 007.93 20h8.138a1 1 0 00.997-.929L18 6m-6 5v4m8-9H4m4.5 0l.544-1.632A2 2 0 0110.941 3h2.117a2 2 0 011.898 1.368L15.5 6"/></svg>';

    deleteTodoButton.innerHTML = trashBinIcon;
    deleteTodoButton.classList.add('delete-todo-button');
    deleteTodoButtonArray.push(deleteTodoButton);
    deleteTodoButton.dataset.id = deleteTodoButtonArray.indexOf(deleteTodoButton);

    deleteTodoButton.addEventListener('click', (e) => {
      e.target.dataset.id = e.currentTarget.parentElement.parentElement.dataset.id; // dynamically set id
      const buttonId = e.target.dataset.id;
      controllerModule.activeProject.todosArray.splice(buttonId, 1);
      renderTodos(controllerModule.activeProject);

      populateStorage();
    });

    return deleteTodoButton;
  }

  function expandTodo(e, todo) {
    const todoWrapper = e.currentTarget.parentElement.parentElement;
    console.log(todoWrapper);
    todoWrapper.classList.toggle('active-todo');
    if (todoWrapper.classList.contains('active-todo') === true) {
      const descriptionWrapper = document.createElement('div');
      const description = document.createElement('p');
      const priorityWrapper = document.createElement('div');
      descriptionWrapper.classList.add('description');
      priorityWrapper.classList.add('priority-wrapper');

      description.textContent = todo.description;
      priorityWrapper.textContent = `Priority: ${todo.priority}`;

      todoWrapper.append(descriptionWrapper);
      todoWrapper.append(priorityWrapper);
      descriptionWrapper.append(description);
    } else if (todoWrapper.classList.contains('active-todo') === false) {
      const descriptionWrapper = todoWrapper.querySelector('.description');
      const priorityWrapper = todoWrapper.querySelector('.priority-wrapper');

      descriptionWrapper.remove();
      priorityWrapper.remove();
    }
  }

  function editTodo(e, project, todo) {
    const todoWrapper = e.currentTarget.parentElement.parentElement;
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
      editTitleField.maxLength = 20;
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
      saveButton.classList.add('save-button');
      const svgString = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" height=20 width=20 class="humbleicons hi-save"><path xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7.828a2 2 0 00-.586-1.414l-1.828-1.828A2 2 0 0016.172 4H15M8 4v4a1 1 0 001 1h5a1 1 0 001-1V4M8 4h7M7 17v-3a1 1 0 011-1h8a1 1 0 011 1v3"/></svg>';
      saveButton.innerHTML = svgString;
      saveButton.addEventListener('click', () => {
        controllerModule.editTodo(todo, editTitleField.value, editDescriptionField.value, format(new Date(editDueDateField.value), 'MMM/dd/yyyy'), editPriorityField.value);
        renderTodos(project);
        populateStorage();
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
    const svgString = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" width=20 height=20 class="humbleicons hi-chevron-down"><path xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-width="2" d="M5 10l7 7 7-7"/></svg>';
    expandButton.innerHTML = svgString;
    expandButton.classList.add('expand-button');

    expandButton.addEventListener('click', (e) => {
      // dynamically set id
      e.currentTarget.dataset.id = e.currentTarget.parentElement.parentElement.dataset.id;
      expandTodo(e, todo);
    });
    return expandButton;
  }

  function createEditButton(project, todo) {
    const editButton = document.createElement('button');
    const editSvgString = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" height=20 width=20 class="humbleicons hi-pencil"><path xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 7.5l3 3M4 20v-3.5L15.293 5.207a1 1 0 011.414 0l2.086 2.086a1 1 0 010 1.414L7.5 20H4z"/></svg>';
    editButton.innerHTML = editSvgString;
    editButton.classList.add('edit-button');

    editButton.addEventListener('click', (e) => {
      console.log('hello, i am edit piath');
      editTodo(e, project, todo);
    });

    return editButton;
  }

  function changeTodoColor(todo, domTodo) {
    const prj = todo.priority;
    switch (prj) {
      case 'Low':
        domTodo.style.backgroundColor = '#8b5cf6';
        break;
      case 'Medium':
        domTodo.style.backgroundColor = '#6d28d9';
        break;
      case 'High':
        domTodo.style.backgroundColor = '#4c1d95';
        break;
    }
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
        populateStorage();
      });

      todoTitle.textContent = todo.title;
      dueDate.textContent = todo.dueDate;

      renderedProject.append(todoWrapper);
      todoWrapper.append(checkBoxWrapper, todoTitle, dueDate, iconsContainer);
      checkBoxWrapper.append(checkBox);
      iconsContainer.append(deleteTodoButton);
      iconsContainer.append(editButton);
      iconsContainer.append(expandButton);

      changeTodoColor(todo, todoWrapper);
    });
  }




  return {
    renderTodos,
    domCreateTodo,
  };
})();

export default domTodoController;


