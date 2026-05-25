import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const TodoItem = ({ todo, toggleTask, removeTask }) => {
  return (
    <div className={todo.completed ? "todo-row complete" : "todo-row"}>
      <div className="todo-row-main" onClick={() => toggleTask(todo.id)}>
        {todo.task}
        <div className="iconsContainer">
          <RiCloseCircleLine
            onClick={(e) => {
              e.stopPropagation();
              removeTask(todo.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
