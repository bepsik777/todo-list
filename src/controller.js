
const projectManager = () => {
  function createProject(factory, title, container) {
    const newProject = factory(title);
    container.push(newProject);
    return newProject;
  }

  const removeProject = (projectIndex, container) => {
    container.splice(projectIndex, 1);
  };

  function switchProject(projectIndex, container) {
    this.activeProject = container[projectIndex];
  }


  return {
    createProject,
    removeProject,
    switchProject,
  };
};

const todoManager = () => {
  const createTodo = (activeProject, factory, title, description, dueDate, priority) => {
    const newTodo = factory(title, description, dueDate, priority);
    activeProject.push(newTodo);

    return newTodo;
  };

  const removeTodo = (todoIndex, container) => {
    container.splice(todoIndex, 1);
  };

  const editTodo = (todo, title, description, dueDate, priority) => {
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
  };

  return {
    createTodo,
    removeTodo,
    editTodo,
  };
};

const controllerModule = (() => {
  const state = {
    projectsArray: [],
    activeProject: undefined,
  };

  return {
    ...state,
    ...projectManager(),
    ...todoManager(),
  };
})();




export default controllerModule;
