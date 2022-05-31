document.addEventListener('DOMContentLoaded', () => {
  const BTN_ADD = document.querySelector('.btn__add')
  const ADD_INPUT = document.querySelector('.header__task')
  const TASKS_LIST = document.querySelector('.list')

  let tasks = []

  const createTaskTemolate = ({id, name, flag}) => {
    const TASK = `
      <li class="task" id="${id}">
          <input type="checkbox" class="task__complete" ${ flag ? 'checked' : '' }>
          <label class="task__name">${name}</label>
          <input type="text" 
                 name="task" id="t" 
                 class="task__name 
                 task__name_edit"
                 value="${name}">
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
  }

  BTN_ADD.addEventListener('click', addTask)
  document.addEventListener('click', (e) => {
    if( e.target.classList.contains('btn__remove')){
      console.log(e.target.parentNode);
    }
  })
});
