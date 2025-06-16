"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    // Adds a new todo
    static async addTask(params) {
      return await Todo.create(params);
    }

    // Display todo list
    static async showList() {
      console.log("My Todo list\n");

      console.log("Overdue");
      const overdues = await this.overdue();
      overdues.forEach((todo) => {
        console.log(todo.displayableString());
      });
      console.log("\n");

      console.log("Due Today");
      const dueToday = await this.dueToday();
      dueToday.forEach((todo) => {
        console.log(todo.displayableString());
      });
      console.log("\n");

      console.log("Due Later");
      const dueLater = await this.dueLater();
      dueLater.forEach((todo) => {
        console.log(todo.displayableString());
      });
    }

    // Fetch all overdue tasks
    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Sequelize.Op.lt]: new Date().toISOString().split("T")[0],
          },
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    // Fetch tasks due today
    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: new Date().toISOString().split("T")[0],
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    // Fetch tasks due in the future
    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Sequelize.Op.gt]: new Date().toISOString().split("T")[0],
          },
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    // Mark a task as complete
    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }

    // Format each todo item for printing
    displayableString() {
      const UNCHECKED_BOX = "[ ]";
      const CROSS_BOX = "[✗]";

      const today = new Date().toISOString().split("T")[0];

      // Decide the box symbol
      let checkbox;
      if (this.dueDate < today) {
        checkbox = CROSS_BOX; // Incomplete and overdue
      } else {
        checkbox = UNCHECKED_BOX; // Incomplete but not overdue
      }
     
      const needsDueDate = this.dueDate !== today || this.completed;
      const datePart = needsDueDate ? this.dueDate : "";

      return `${this.id}. ${checkbox} ${this.title} ${datePart}`.trim();
    }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );

  return Todo;
};
