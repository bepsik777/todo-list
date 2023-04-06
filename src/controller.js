


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
  const createTodo = (activeContainer, factory, title, description, dueDate, addDate, priority) => {
    const newTodo = factory(title, description, dueDate, addDate, priority);
    // Automatically push the todo into the active project
    activeContainer.push(newTodo);
    return newTodo;
  };

  const removeTodo = (todo, container) => {
    const indexOfTodo = container.indexOf(todo);
    container.splice(indexOfTodo, 1);
  };

  return {
    createTodo,
    removeTodo,
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
