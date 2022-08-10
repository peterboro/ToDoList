import { saveLocal } from './state.js';

export const add = (lists) => {
  lists.push({
    description: document.querySelector('#description').value, isCompleted: false, index: lists.length + 1,
  });
  document.querySelector('#description').value = '';
  saveLocal(lists);
};

export const updateIndex = (lists) => {
  let i = 1;
  lists.forEach((elem) => {
    elem.index = i;
    i += 1;
  });
};

export const removeDone = (lists) => {
  lists = lists.filter((elem) => elem.isCompleted === false);
  updateIndex(lists);
  saveLocal(lists);
};