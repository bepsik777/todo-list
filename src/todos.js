

const Todo = (title, description, dueDate, addDate, priority) => {
  const finished = false;

  return {
    finished,
    title,
    description,
    dueDate,
    addDate,
    priority,
  };
};

export default Todo;

