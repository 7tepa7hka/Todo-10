import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const API = "https://jsonplaceholder.typicode.com/todos?_limit=10";

  // загрузка с API только если пусто
  useEffect(() => {
    if (todos.length === 0) {
      fetch(API)
        .then((res) => res.json())
        .then((data) => {
          const formatted = data.map((todo) => ({
            id: todo.id,
            task: todo.title,
            completed: todo.completed,
          }));

          setTodos(formatted);
        });
    }
  }, []);

  // localStorage (ОСТАВИЛ ОДИН — убрал дубль)
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = (userInput) => {
    if (!userInput.trim()) return;

    const newTask = {
      id: Date.now(),
      task: userInput,
      completed: false,
    };

    setTodos([...todos, newTask]);
  };

  const removeTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <TodoForm addTask={addTask} />
      <hr className="separator" />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTask={removeTask}
          toggleTask={toggleTask}
        />
      ))}
    </div>
  );
}

export default App;
