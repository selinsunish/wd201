const todoList = require("../todo");

const todos = todoList();

describe("Todo Test Suite", () => {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  beforeAll(() => {
    todos.add({ title: "Overdue todo", dueDate: yesterday, completed: false });
    todos.add({ title: "Due today todo", dueDate: today, completed: false });
    todos.add({ title: "Due later todo", dueDate: tomorrow, completed: false });
  });

  test("Should add new todo", () => {
    const count = todos.all.length;
    todos.add({ title: "New Todo", dueDate: today, completed: false });
    expect(todos.all.length).toBe(count + 1);
  });

  test("Should mark a todo as complete", () => {
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("Should return overdue items", () => {
    const overdueItems = todos.overdue();
    expect(overdueItems.every((item) => item.dueDate < today)).toBe(true);
  });

  test("Should return due today items", () => {
    const todayItems = todos.dueToday();
    expect(todayItems.every((item) => item.dueDate === today)).toBe(true);
  });

  test("Should return due later items", () => {
    const laterItems = todos.dueLater();
    expect(laterItems.every((item) => item.dueDate > today)).toBe(true);
  });

  test("Should format todos using toDisplayableList", () => {
    const list = todos.dueToday();
    const output = todos.toDisplayableList(list);
    expect(typeof output).toBe("string");
    expect(output).toContain("[ ] Due today todo");
  });
});

