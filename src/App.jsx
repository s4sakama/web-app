import { useEffect, useState } from "react";
import { loadTasks, saveTasks } from "./storage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  // 初回のみ localStorage から読み込み
  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  // tasks が変わるたびに保存
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setText("");
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

  return (
    <div className="container">
      <h1>タスク管理アプリ</h1>

      <div className="input-area">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="タスクを入力"
        />
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
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className={task.completed ? "done" : ""}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button onClick={() => removeTask(task.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
