import * as task from './task.js';
import * as stat from './state.js';
import './style.css';

let lists = [];
const listEl = document.querySelector('ul');

const todoList = () => {
  if (window.localStorage.getItem('localTasks')) {
    const localTasks = window.localStorage.getItem('localTasks');
    lists = JSON.parse(localTasks);
  }
  document.querySelector('.task-box').innerHTML = '';
  lists.forEach((item) => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');
    if (item.isCompleted) { taskElement.classList.add('completed'); }
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-check');
    checkbox.addEventListener('click', () => {
      stat.state(item, lists);
      todoList();
    });
    checkbox.checked = item.isCompleted;
    taskElement.appendChild(checkbox);
    const taskText = document.createElement('input');
    taskText.classList = 'task-text';
    taskText.value = item.description;
    taskText.addEventListener('change', () => {
      if (taskText.value.length > 0) {
        item.description = taskText.value;
        stat.saveLocal(lists);
      }
    });
    taskElement.appendChild(taskText);
    const dragIcon = document.createElement('button');
    dragIcon.classList = 'far fa-trash-alt deleteBtn';
    taskElement.appendChild(dragIcon);
    taskElement.draggable = 'true';
    document.querySelector('.task-box').appendChild(taskElement);
  });
};

const removeItem = (e) => {
  if (!e.target.classList.contains('deleteBtn')) {
    return;
  }
  const btn = e.target;
  lists.forEach((task) => {
    if (task.description === btn.parentElement.children[1].value) {
      lists.splice(lists.indexOf(task), 1);
    }
  });
  btn.closest('li').remove();
  task.updateIndex(lists);
  stat.saveLocal(lists);
};

listEl.addEventListener('click', removeItem);
todoList();
document.querySelector('#task-input').addEventListener('submit', (event) => {
  event.preventDefault();
  task.add(lists);
  todoList();
});
document.querySelector('.clear-btn').addEventListener('click', () => {
  task.removeDone(lists);
  todoList();
});
