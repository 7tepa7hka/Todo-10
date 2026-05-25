import React, { useState } from "react";

function TodoForm({ addTask }) {
  const [userInput, setUserInput] = useState("");
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };
  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task..."
          onChange={handleChange}
          value={userInput}
          className="todo-input"
        />
        <button className="todo-button">Save</button>
      </form>
    </div>
  );
}

export default TodoForm;
