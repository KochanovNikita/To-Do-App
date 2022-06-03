document.addEventListener('DOMContentLoaded', () => {
  const BTN_ADD = document.querySelector('.btn__add');
  const ADD_INPUT = document.querySelector('.header__task');
  const TASKS_LIST = document.querySelector('#tasks');
  const TASKS_COMPLETE_LIST = document.querySelector('#completeTasks');
  const BTN_SWAP = document.querySelector('.btn__swap');
  const ANIMATION_ADD = 'task__animation_add';
  let tasks = [];
  let isActiveTasks = true;

  const createTaskTemolate = ({ id, name, flag }, className) => {
    const TASK = `
    <li class="task ${className || ''}" id="${id}">
          <label class="task__flag_visible">
            <input type="checkbox" class="task__flag" ${flag ? 'checked' : ''} id="check-${id}">
            <span class="task__flag_active"></span>
          </label>
          <span class="task__name ${flag ? 'task__name_checked' : ''}"> 
            ${name}
          </span>
          <input type="text" name="task" class="task__name task__name_visible" value="${name}">
          <button class="btn btn__edit">Edit</button>
          <button class="btn btn__remove">Remove</button>
      </li>
    `;

    if (!flag) {
      TASKS_LIST.innerHTML += TASK;
    } else {
      TASKS_COMPLETE_LIST.innerHTML = TASK + TASKS_COMPLETE_LIST.innerHTML;
    }
  };

  const addTask = () => {
    const value = ADD_INPUT.value.trim();
    if (value.length > 0) {
      const task = {
        id: Date.now(),
        name: value,
        flag: false,
      };

      createTaskTemolate(task, ANIMATION_ADD);
      ADD_INPUT.setAttribute('placeholder', 'write to-do');
      tasks.push(task);
      updateTasksToLocalStorage();
    } else {
      ADD_INPUT.setAttribute('placeholder', 'task dont be empty');
    }
    ADD_INPUT.value = '';
  };

  const removeTask = (e) => {
    if (e.target.classList.contains('btn__remove')) {
      const TASK = e.target.parentNode;
      tasks = tasks.filter((task) => task.id != TASK.id);
      updateTasksToLocalStorage();
      TASK.classList.add('task__animation_remove');
    }
  };

  const editAndSaveTask = (e) => {
    if (e.target.classList.contains('btn__save') || e.target.classList.contains('btn__edit')) {
      const BTN = e.target;
      const TASK = e.target.parentNode;
      const INPUT = nodeSearch(TASK.childNodes, 'INPUT', 'task__name');
      const SPAN = nodeSearch(TASK.childNodes, 'SPAN', 'task__name');

      BTN.classList.toggle('btn__edit');
      BTN.classList.toggle('btn__save');

      INPUT.classList.toggle('task__name_visible');
      SPAN.classList.toggle('task__name_visible');
      SPAN.innerText = INPUT.value;

      tasks.map((task) => (task.id == TASK.id ? task.name = INPUT.value : ''));
      updateTasksToLocalStorage();

      BTN.innerHTML === 'Edit' ? BTN.innerHTML = 'Save' : BTN.innerHTML = 'Edit';
    }
  };

  const completeTask = (e) => {
    if (e.target.classList.contains('task__flag')) {
      const LABEL = e.target.parentNode;
      const TASK = LABEL.parentNode;
      const SPAN = nodeSearch(TASK.childNodes, 'SPAN', 'task__name');
      SPAN.classList.toggle('task__name_checked');
     
      tasks.map((task) => (task.id == TASK.id ? task.flag = !task.flag : task.flag = task.flag));

      tasks.forEach(({ id, name, flag }) => {
        if (id == TASK.id) {
          createTaskTemolate({ id, name, flag }, ANIMATION_ADD);
        }
      });

      updateTasksToLocalStorage();

      TASK.classList.add('task__animation_remove');
    }
  };

  const nodeSearch = (nodeList, tag, className) => {
    let node;
    nodeList.forEach((currentNode) => {
      if (currentNode.tagName == tag && currentNode.classList.contains(className)) {
        node = currentNode;
      }
    });
    return node;
  };

  const updateTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const checkTasks = () => {
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.forEach((task) => {
        createTaskTemolate(task);
      });
    }
  };

  const swapTasksList = () => {
    const TITLE = document.querySelectorAll('.title')[1];
    TASKS_LIST.classList.toggle('list__disable');
    TASKS_COMPLETE_LIST.classList.toggle('list__disable');
    if (isActiveTasks) {
      BTN_SWAP.innerText = 'Active ToDo';
      TITLE.innerText = 'Completed Tasks';
    } else {
      BTN_SWAP.innerText = 'Completed';
      TITLE.innerText = 'Active ToDo';
    }

    isActiveTasks = !isActiveTasks;
  };

  const animationTasks = (e) => {
    const TASK = e.target;
    if (TASK.classList.contains('task__animation_remove')) {
      TASK.classList.remove('task__animation_remove');
      TASK.parentNode.removeChild(TASK);
    }
    if (TASK.classList.contains('task__animation_add')) {
      TASK.classList.remove('task__animation_add');
    }
  };

  checkTasks();
  BTN_ADD.addEventListener('click', addTask);
  BTN_SWAP.addEventListener('click', swapTasksList);
  const EVENTS = [removeTask, editAndSaveTask, completeTask];
  EVENTS.forEach((event) => {
    document.addEventListener('click', event);
  });
  document.addEventListener('animationend', animationTasks);
});
