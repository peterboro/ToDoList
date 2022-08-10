export const saveLocal = (lists) => {
  window.localStorage.setItem('localTasks', JSON.stringify(lists));
};

export const state = (element, lists) => {
  lists.forEach((task) => {
    if (task === element) {
      task.isCompleted = !task.isCompleted;
    }
  });
  saveLocal(lists);
};