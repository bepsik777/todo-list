const todoFactory = (title, description, dueDate, addDate, priority) => {
  function sayThis() {
    console.log(this);
  }

  return {
    sayThis,
    title,
    description,
    dueDate,
    addDate,
    priority,
  };
};

export default todoFactory;
