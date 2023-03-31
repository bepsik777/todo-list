
function projectFactory(title) {
  const todosArray = [];
  const rendered = false;

  return {
    todosArray,
    title,
    rendered,
  };
}

export default projectFactory;
