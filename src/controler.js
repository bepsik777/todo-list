const controlerModule = (() => {
  const projectsArray = [];
  let activeProject;

  const createProject = (factory, title) => {
    const project = factory(title);
    projectsArray.push(project);
    return project;
  };

  const switchProject = (project) => {
    activeProject = project;
    console.log(activeProject);
  };


  return {
    projectsArray,
    activeProject,
    createProject,
    switchProject,
  };
})();

export default controlerModule;
