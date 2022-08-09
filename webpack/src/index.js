// import _ from 'lodash';
import './style.css';

const todo = [
  { description: 'Wash the dishes', isCompleted: false, index: 0 },
  { description: 'Complete To Do List Project', isCompleted: false, index: 1 },
];

const todoList = () => {
  let todoListContent = '';
  todo.forEach((item) => {
    todoListContent += `<li class="task"><input class="task-check" type="checkbox"><span class="list">${item.description}</span><i class='fa fa-ellipsis-v' style="float: right;"></i></li>`;
  });
  document.querySelector('.task-box').innerHTML = todoListContent;
};
todoList();
