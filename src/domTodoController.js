import { format } from 'date-fns';
import controllerModule from './controller';
import Todo from './todos';


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
    const date = format(new Date(endDateInput.value), 'MM/dd/yyyy');
    const priority = priorityInput.value;


    controllerModule.createTodo(actProjectContainer, Todo, title, description, date, priority);
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
      renderTodos();
      console.log(e.target.dataset.id);
    });

    return deleteTodoButton;
  }

  function expandTodo(e) {
    const todoWrapper = e.target.parentElement.parentElement;
    todoWrapper.classList.toggle('active-todo');
    if (todoWrapper.classList.contains('active-todo') === true) {
      const descriptionWrapper = document.createElement('div');
      const description = document.createElement('p');
      const priorityWrapper = document.createElement('div');
      descriptionWrapper.classList.add('description');
      priorityWrapper.classList.add('priority-wrapper');

      description.textContent = controllerModule.activeProject.todosArray[todoWrapper.dataset.id].description;
      priorityWrapper.textContent = controllerModule.activeProject.todosArray[todoWrapper.dataset.id].priority;

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

  function editTodo(e) {
    const todoWrapper = e.target.parentElement.parentElement;
    const editedTodo = controllerModule.activeProject.todosArray[todoWrapper.dataset.id];
    todoWrapper.classList.toggle('edited-todo');
    if (todoWrapper.classList.contains('edited-todo')) {
      // get some of the existing elemnts, to replace them after
      const editButton = todoWrapper.querySelector('.edit-button');
      const domTodoTitle = todoWrapper.querySelector('.todo-title');
      const domTodoDate = todoWrapper.querySelector('.date-paragraph');
      // const expandButton = todoWrapper.querySelector('.expand-button');

      // create the new elements, to be able to edit todo
      const editTitleField = document.createElement('input');
      editTitleField.type = 'text';
      editTitleField.maxLength = 32;
      editTitleField.value = editedTodo.title;

      const editDescriptionField = document.createElement('textarea');
      editDescriptionField.classList.add('edit-description');
      editDescriptionField.value = editedTodo.description;
      editDescriptionField.maxLength = 150;

      const editPriorityField = document.createElement('select');
      editPriorityField.classList.add('edit-priority');
      const lowOption = document.createElement('option');
      lowOption.value = 0;
      lowOption.textContent = 'Low';
      const mediumOption = document.createElement('option');
      mediumOption.value = 1;
      mediumOption.textContent = 'Medium';
      const highOption = document.createElement('option');
      highOption.value = 2;
      highOption.textContent = 'High';
      editPriorityField.append(lowOption, mediumOption, highOption);

      const editDueDateField = document.createElement('input');
      editDueDateField.type = 'date';
      console.log(new Date(editedTodo.dueDate));
      console.log(format(new Date(editedTodo.dueDate), 'yyyy-MM-dd'));
      editDueDateField.value = format(new Date(editedTodo.dueDate), 'yyyy-MM-dd');

      const saveButton = document.createElement('button');
      saveButton.textContent = 's';
      saveButton.addEventListener('click', () => {
        controllerModule.editTodo(editedTodo, editTitleField.value, editDescriptionField.value, format(new Date(editDueDateField.value), 'MM/dd/yyyy'), editPriorityField.value);
        renderTodos();
      });


      todoWrapper.append(editDescriptionField, editPriorityField);
      domTodoTitle.replaceWith(editTitleField);
      editButton.replaceWith(saveButton);
      domTodoDate.replaceWith(editDueDateField);
      // console.log(editTitleField);
      // console.log(editedTodo);
      e.target.textContent = 's';
    } else if (!todoWrapper.classList.contains('edited-todo')) {
      e.target.textContent = 'e';
    }
  }

  function createExpandButton() {
    const expandButton = document.createElement('button');
    expandButton.textContent = '↓';
    expandButton.classList.add('expand-button');

    expandButton.addEventListener('click', (e) => {
      e.target.dataset.id = e.target.parentElement.parentElement.dataset.id;
      expandTodo(e);
    });
    return expandButton;
  }

  function createEditButton() {
    const editButton = document.createElement('button');
    editButton.textContent = 'e';
    editButton.classList.add('edit-button');

    editButton.addEventListener('click', (e) => {
      console.log('hello, i am edit piath');
      editTodo(e);
    });

    return editButton;
  }

  function renderTodos() {
    const renderedTodos = document.querySelectorAll('.example-todo');
    renderedTodos.forEach((todo) => {
      todo.remove();
    });
    const renderedProject = document.querySelector('.active-project');
    controllerModule.activeProject.todosArray.forEach((todo) => {
      const todoWrapper = document.createElement('div');
      const checkBoxWrapper = document.createElement('div');
      const checkBox = document.createElement('input');
      const todoTitle = document.createElement('h3');
      const dueDate = document.createElement('p');
      const iconsContainer = document.createElement('div');
      const deleteTodoButton = createDeleteTodoButton();
      const editButton = createEditButton();
      const expandButton = createExpandButton();

      todoWrapper.classList.add('example-todo');
      todoWrapper.dataset.id = controllerModule.activeProject.todosArray.indexOf(todo);
      checkBoxWrapper.classList.add('check-container');
      todoTitle.classList.add('todo-title');
      iconsContainer.classList.add('icons-container');
      dueDate.classList.add('date-paragraph');

      checkBox.id = 'finished';
      checkBox.type = 'checkbox';
      checkBox.name = 'checkbox';

      todoTitle.textContent = todo.title;
      dueDate.textContent = todo.dueDate;

      renderedProject.append(todoWrapper);
      todoWrapper.append(checkBoxWrapper, todoTitle, dueDate, iconsContainer);
      checkBoxWrapper.append(checkBox);
      iconsContainer.append(deleteTodoButton);
      iconsContainer.append(editButton);
      iconsContainer.append(expandButton);

      console.log(todo.dueDate);
    });
    // console.log(controllerModule.activeProject.todosArray);
  }


  return {
    renderTodos,
    domCreateTodo,
  };
})();

export default domTodoController;


/*
Next step:
- Add the possibility to edit todo
*/
