document.addEventListener('DOMContentLoaded', () => {
  const BTN_ADD = document.querySelector('.btn__add')
  const ADD_INPUT = document.querySelector('.header__task')
  const TASKS_LIST = document.querySelector('.list')

  let tasks = []

  const createTaskTemolate = ({id, name, flag}) => {
    const TASK = `
    <li class="task" id="${id}">
          <input type="checkbox" class="task__flag" ${ flag ? 'checked' : '' }>
          <label class="task__name ${flag ? 'task__name_checked' : ''}">${name}</label>
          <input type="text" name="task" class="task__name task__name_visible" value="${name}">
          <button class="btn btn__edit">Edit</button>
          <button class="btn btn__remove">Remove</button>
      </li>
    `
    TASKS_LIST.innerHTML = TASK + TASKS_LIST.innerHTML
  }

  const addTask = () => {
    const task = {
      id: Date.now(),
      name: ADD_INPUT.value,
      flag: false
    }

    ADD_INPUT.value = ''
    createTaskTemolate(task)
    tasks.push(task)
    updateTasksToLocalStorage()
  }

  const removeTask = (e) => {
    if(e.target.classList.contains('btn__remove')){
      const TASK = e.target.parentNode
      TASKS_LIST.removeChild(TASK)
      tasks = tasks.filter(task => task.id != TASK.id)
      updateTasksToLocalStorage()
    }
  }  

  const editAndSaveTask = (e) => {
    if(e.target.classList.contains('btn__save') || e.target.classList.contains('btn__edit')){
      const BTN = e.target
      const TASK = e.target.parentNode
      const INPUT = nodeSearch(TASK.childNodes, 'INPUT', 'task__name')
      const LABEL= nodeSearch(TASK.childNodes, 'LABEL', 'task__name')
      console.log(TASK.childNodes);
      console.log(INPUT);
      console.log(LABEL);

      BTN.classList.toggle('btn__edit')
      BTN.classList.toggle('btn__save')

      INPUT.classList.toggle('task__name_visible')
      LABEL.classList.toggle('task__name_visible')
      LABEL.innerText = INPUT.value

      tasks.map(task => task.id == TASK.id ? task.name = INPUT.value : '')
      updateTasksToLocalStorage()

      BTN.innerHTML === 'Edit' ? BTN.innerHTML = 'Save' : BTN.innerHTML = 'Edit'
    }
  }

  const completeTask = (e) => {
    if(e.target.classList.contains('task__flag')){
      const TASK = e.target.parentNode
      const LABEL = nodeSearch(TASK.childNodes, 'LABEL', 'task__name')
      LABEL.classList.toggle('task__name_checked')

      tasks.map(task => task.id == TASK.id ? task.flag = !task.flag : task.flag = task.flag)
      updateTasksToLocalStorage()
    }
  }

  const nodeSearch = (nodeList, tag, className) => {
    let node

    nodeList.forEach(currentNode => {
      if(currentNode.tagName == tag && currentNode.classList.contains(className)){
        node = currentNode
      }

    });

    return node
  }

  const updateTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const checkTasks = () => {
    if(localStorage.getItem('tasks')){
      tasks = JSON.parse(localStorage.getItem('tasks'))
      tasks.forEach(task => {
        createTaskTemolate(task)
      });
    }
  }

  checkTasks()
  BTN_ADD.addEventListener('click', addTask)
  const EVENTS = [removeTask, editAndSaveTask, completeTask]
  EVENTS.forEach(event => {
    document.addEventListener('click', event)
  })
});
