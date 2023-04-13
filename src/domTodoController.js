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
    const date = endDateInput.value;
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
    const todo = e.target.parentElement.parentElement;
    todo.classList.toggle('active-todo');
    console.log(todo.classList);
    // if (todo.classList.contains('active-todo')) {
    //   const todoExtension = document.createElement('div');
    //   todoExtension.classList.add('todo-extension');
    // }
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
      const iconsContainer = document.createElement('div');
      const deleteTodoButton = createDeleteTodoButton();
      const expandButton = createExpandButton();

      todoWrapper.classList.add('example-todo');
      todoWrapper.dataset.id = controllerModule.activeProject.todosArray.indexOf(todo);
      checkBoxWrapper.classList.add('check-container');
      todoTitle.classList.add('todo-title');
      iconsContainer.classList.add('icons-container');

      checkBox.id = 'finished';
      checkBox.type = 'checkbox';
      checkBox.name = 'checkbox';

      todoTitle.textContent = todo.title;

      renderedProject.append(todoWrapper);
      todoWrapper.append(checkBoxWrapper, todoTitle, iconsContainer);
      checkBoxWrapper.append(checkBox);
      iconsContainer.append(deleteTodoButton);
      iconsContainer.append(expandButton);
    });
    console.log(controllerModule.activeProject.todosArray);
  }


  return {
    renderTodos,
    domCreateTodo,
  };
})();

export default domTodoController;


/*
Next step:
- Add the possibility to expand todos
*/
