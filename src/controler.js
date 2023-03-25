const controlerModule = (() => {
  const projectsArray = [];
  let activeProject;

  const createProject = (factory, title) => {
    const project = factory(title);
    projectsArray.push(project);
  };

  const switchProject = (project) => {
    activeProject = project;
  };

  const debug = () => console.log(projectsArray);

  return {
    debug,
    projectsArray,
    activeProject,
    createProject,
    switchProject,
  };
})();

export default controlerModule;
