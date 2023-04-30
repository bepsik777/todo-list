

function todoFactory(title, description, dueDate, priority) {
  const finished = false;

  return {
    finished,
    title,
    description,
    dueDate,
    priority,
  };
}

function projectFactory(title) {
  const todosArray = [];
  const rendered = false;

  return {
    todosArray,
    title,
    rendered,
  };
}

// export default Todo;

export { todoFactory, projectFactory };

