
function projectFactory(title) {
  const todosArray = [];

  return {
    todosArray,
    title,
  };
}

export default projectFactory;
