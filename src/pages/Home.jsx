
import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function Home() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  // Save todos whenever the array changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      completed: false
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Mark a todo as completed or incomplete
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  // Edit a todo
  const editTodo = (id, oldTitle) => {
    const newTitle = prompt("Edit your task:", oldTitle);

    if (newTitle === null || newTitle.trim() === "") {
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, title: newTitle.trim() }
          : todo
      )
    );
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <main className="container">
      <h1>My Todo App</h1>
      <p className="subtitle">
        Plan your day, one task at a time.
      </p>

      <TodoForm onAddTodo={addTodo} />

      <div className="summary">
        <span>Total: {todos.length}</span>
        <span>Completed: {completedCount}</span>
        <span>Pending: {todos.length - completedCount}</span>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("active")}>
          Active
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </main>
  );
}

export default Home;
