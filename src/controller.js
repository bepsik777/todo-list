


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
  const createTodo = (activeContainer, factory, title, description, dueDate, priority) => {
    const newTodo = factory(title, description, dueDate, priority);
    // Automatically push the todo into the active project
    activeContainer.push(newTodo);
    return newTodo;
  };

  const removeTodo = (todoIndex, container) => {
    container.splice(todoIndex, 1);
  };

  const editTodo = (todo, title, description, priority) => {
    todo.title = title;
    todo.description = description;
    todo.priority = priority;
  };

  return {
    createTodo,
    removeTodo,
    editTodo,
  };
};

const controllerModule = (() => {
  const proto = {
    projectsArray: [],
    activeProject: undefined,
  };

  return {
    ...proto,
    ...projectManager(),
    ...todoManager(),
  };
})();



export default controllerModule;
