const todoList = () => {
  let all = [];

  const add = (todo) => {
    all.push(todo);
  };

  const getAll = () => all;

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((todo) => todo.dueDate < today);
  };

  const dueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((todo) => todo.dueDate === today);
  };

  const dueLater = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((todo) => todo.dueDate > today);
  };

  const toDisplayableList = (list) => {
    const today = new Date().toISOString().split("T")[0];
    return list
      .map((todo) => {
        const checkbox = todo.completed ? "[x]" : "[ ]";
        const date = todo.dueDate === today ? "" : ` ${todo.dueDate}`;
        return `${checkbox} ${todo.title}${date}`;
      })
      .join("\n");
  };

  return {
    all,
    add,
    getAll, // Include here
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
