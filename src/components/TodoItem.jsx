
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <span className={todo.completed ? "completed" : ""}>
        {todo.title}
      </span>

      <button
        type="button"
        onClick={() => onEdit(todo.id, todo.title)}
      >
        Edit
      </button>

      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
