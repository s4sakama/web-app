import { useEffect, useState } from "react";
import { loadTasks, saveTasks } from "./storage";

function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  // tasks が変わるたびに保存 (初回マウント時も実行される)
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = () => {
    if (!text.trim()) return;

    setTasks([...tasks, 
      {
        id: crypto.randomUUID(), 
        text, 
        completed: false,
        priority, 
        dueDate
      }
    ]);
    setText("");
    setPriority("medium")
    setDueDate("");
  };

  // Enterキーでの追加対応
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const today = new Date().toISOString().slice(0, 10);

  const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2
};

const sortedTasks = filteredTasks.slice().sort((a, b) => {
  if (a.completed !== b.completed) {
    return a.completed - b.completed;
  }

  if (a.dueDate && b.dueDate) {
    if (a.dueDate !== b.dueDate) {
      return a.dueDate.localeCompare(b.dueDate);
    }
  }

  return priorityOrder[a.priority] - priorityOrder[b.priority];
});

  return (
    <div className="container">
      <h1>タスク管理アプリ</h1>

      <div className="input-area">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="タスクを入力"
        />

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>

        <button onClick={addTask}>追加</button>
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          すべて
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          未完了
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          完了
        </button>
      </div>

      <ul>
        {filteredTasks.map(task => {
          const isExpired =
            task.dueDate &&
            !task.completed &&
            new Date(task.dueDate) < new Date();
      
          return (
            <li 
              key={task.id} 
              className={`
                ${task.completed ? "done" : ""}
                ${isExpired ? "expired" : ""}
              `}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />

              <span className="task-text">{task.text}</span>

              <span className={`priority-label priority-${task.priority}`}>
                {task.priority === "high"
                  ? "高"
                 : task.priority === "medium"
                 ? "中"
                 : "低"}
              </span>

              {task.dueDate && (
                <span className="due-date">
                 {task.dueDate}
                </span>
              )}

              {isExpired && <span className="expired-icon">⚠</span>}

              <button onClick={() => removeTask(task.id)}>削除</button>
            </li>
          );
        })}
      </ul>

      {filteredTasks.length === 0 && (
        <p className="empty">タスクがありません</p>
      )}
    </div>
  );
}

export default App;
