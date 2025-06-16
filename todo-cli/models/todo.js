// todo.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    displayableString() {
      const UNCHECKED_BOX = "[ ]";
      const CROSS_BOX = "[x]";
      const today = new Date().toISOString().split("T")[0];

      let checkbox;
      if (this.dueDate < today && !this.completed) {
        checkbox = CROSS_BOX;
      } else if (!this.completed) {
        checkbox = UNCHECKED_BOX;
      } 
      const needsDueDate = this.dueDate !== today || this.completed;
      const datePart = needsDueDate ? this.dueDate : "";

      return `${this.id}. ${checkbox} ${this.title} ${datePart}`.trim();
    }

    // add other static methods if needed
  }

  // ✅ THIS LINE MUST BE OUTSIDE THE CLASS
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
