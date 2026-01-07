function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? "completed" : ""}>
      <span onClick={() => onToggle(task.id)}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>削除</button>
    </li>
  );
}

export default TaskItem;
