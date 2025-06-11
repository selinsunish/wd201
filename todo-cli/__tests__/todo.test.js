const todoList = require("../todo");

describe("Todo Test Suite", () => {
  let todos;

  beforeAll(() => {
    todos = todoList();
  });

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]; // -1 day
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0]; // +1 day

  test("Should add a new todo", () => {
    const initialCount = todos.all.length;
    todos.add({ title: "Test Add", dueDate: today, completed: false });
    expect(todos.all.length).toBe(initialCount + 1);
  });

  test("Should mark a todo as complete", () => {
    todos.add({ title: "Test Complete", dueDate: today, completed: false });
    const index = todos.all.length - 1;
    todos.markAsComplete(index);
    expect(todos.all[index].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    todos.add({ title: "Overdue Task", dueDate: yesterday, completed: false });
    const overdue = todos.overdue();
    expect(overdue.some((todo) => todo.dueDate === yesterday)).toBe(true);
  });

  test("Should retrieve due today items", () => {
    todos.add({ title: "Due Today Task", dueDate: today, completed: false });
    const dueToday = todos.dueToday();
    expect(dueToday.some((todo) => todo.dueDate === today)).toBe(true);
  });

  test("Should retrieve due later items", () => {
    todos.add({ title: "Due Later Task", dueDate: tomorrow, completed: false });
    const dueLater = todos.dueLater();
    expect(dueLater.some((todo) => todo.dueDate === tomorrow)).toBe(true);
  });
});
