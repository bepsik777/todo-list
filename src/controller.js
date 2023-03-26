


const projectManager = () => {
  function createProject(factory, title, container) {
    const newProject = factory(title);
    container.push(newProject);
    return newProject;
  }

  const removeProject = (project, container) => {
    const indexOfProject = container.indexOf(project);
    container.splice(indexOfProject, 1);
  };

  function switchProject(project) {
    this.activeProject = project;
  }

  const sayHi = () => console.log('hi!');

  return {
    sayHi,
    createProject,
    removeProject,
    switchProject,
  };
};

const todoManager = () => {
  const createTodo = (activeContainer, factory, title, description, dueDate, addDate, priority) => {
    const newTodo = factory(title, description, dueDate, addDate, priority);
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
