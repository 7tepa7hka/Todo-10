import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, []);

  const addTask = (userInput) => {
    if (userInput) {
      const newTask = {
        id: Date.now(),
        task: userInput,
        completed: false,
      };
      setTodos([...todos, newTask]);
    }
  };

  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };
  const toggleTask = (id) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo },
      ),
    ]);
  };

  const API = "https://jsonplaceholder.typicode.com/todos?_limit=10";

  useEffect(() => {
    if (todos.length === 0) {
      fetch(API)
        .then((response) => response.json())
        .then((data) => {
          const formattedTodos = data.map((todo) => ({
            id: todo.id,
            task: todo.title,
            completed: todo.completed,
          }));

          setTodos(formattedTodos);
        });
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <TodoForm addTask={addTask} />
      <hr className="separator" />
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          removeTask={removeTask}
          toggleTask={toggleTask}
        />
      ))}
    </div>
  );
}

export default App;
