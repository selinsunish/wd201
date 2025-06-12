// todo-cli/__tests__/todo.js
const todoList = require("../todo");

describe("Todo Test Suite", () => {
  let todos;

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  beforeEach(() => {
    todos = todoList();
  });

  test("Should add a new todo", () => {
    todos.add({ title: "Buy milk", dueDate: today, completed: false });
    const all = todos.getAll();
    expect(all.length).toBe(1);
    expect(all[0].title).toBe("Buy milk");
  });

  test("Should mark a todo as completed", () => {
    todos.add({ title: "Learn Git", dueDate: today, completed: false });
    todos.markAsComplete(0);
    const all = todos.getAll();
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    todos.add({ title: "Submit report", dueDate: yesterday, completed: false });
    todos.add({ title: "Attend meeting", dueDate: today, completed: false });
    const overdue = todos.overdue();
    expect(overdue.length).toBe(1);
    expect(overdue[0].dueDate).toBe(yesterday);
  });

  test("Should retrieve due today items", () => {
    todos.add({ title: "Pay rent", dueDate: today, completed: false });
    todos.add({ title: "Check mail", dueDate: tomorrow, completed: false });
    const dueToday = todos.dueToday();
    expect(dueToday.length).toBe(1);
    expect(dueToday[0].dueDate).toBe(today);
  });

  test("Should retrieve due later items", () => {
    todos.add({ title: "Go for a walk", dueDate: tomorrow, completed: false });
    todos.add({ title: "Fix bugs", dueDate: today, completed: false });
    const dueLater = todos.dueLater();
    expect(dueLater.length).toBe(1);
    expect(dueLater[0].dueDate).toBe(tomorrow);
  });

  test("Should format the displayable list", () => {
    todos.add({ title: "Assignment", dueDate: yesterday, completed: true });
    todos.add({ title: "Revision", dueDate: today, completed: false });
    todos.add({ title: "Meeting", dueDate: tomorrow, completed: false });

    const formattedOverdue = todos.toDisplayableList(todos.overdue());
    const formattedToday = todos.toDisplayableList(todos.dueToday());
    const formattedLater = todos.toDisplayableList(todos.dueLater());

    expect(formattedOverdue).toContain("[x] Assignment");
    expect(formattedToday).toContain("[ ] Revision");
    expect(formattedLater).toContain("[ ] Meeting");
  });
});
