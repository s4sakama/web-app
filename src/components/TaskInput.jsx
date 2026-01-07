import { useState } from "react";

function TaskInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        placeholder="タスクを入力"
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">追加</button>
    </form>
  );
}

export default TaskInput;
