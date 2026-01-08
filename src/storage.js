const STORAGE_KEY = "tasks";

/**
 * タスク一覧を取得
 */
export function loadTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load tasks:", e);
    return [];
  }
}

/**
 * タスク一覧を保存
 */
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks:", e);
  }
}
