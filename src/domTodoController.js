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
      const buttonId = e.target.dataset;
      controllerModule.activeProject.todosArray.splice(buttonId, 1);
      renderTodos();
      console.log(e.target.dataset.id);
    });

    return deleteTodoButton;
  }

  function renderTodos() { // i think i will have to change it to render all todos
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
    });
    console.log(controllerModule.activeProject.todosArray);
  }


  return {
    renderTodos,
    domCreateTodo,
  };
})();

export default domTodoController;
