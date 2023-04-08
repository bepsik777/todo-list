

const Todo = (title, description, dueDate, priority) => {
  const finished = false;

  return {
    finished,
    title,
    description,
    dueDate,
    priority,
  };
};

export default Todo;

