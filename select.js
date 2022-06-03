const THEME_LINK = document.querySelectorAll('link')[1];
const OPTIONS = document.querySelectorAll('.select__option');
const CURRENT_OPTION = document.querySelector('.select__option_selected');
let selectTheme;

const setSelectTheme = (link, name) => {
  THEME_LINK.href = link;
  CURRENT_OPTION.innerText = name
  localStorage.setItem('select', JSON.stringify({link, name}));
};

const toggleSelectActive = () => {
  OPTIONS.forEach( (option, index) => {
    if( index != 0){
      option.classList.toggle('select__option_change')
    }
  }) 
}

const setTheme = (e) => {
  if(e.target.classList.contains('select__option_selected')){
    toggleSelectActive()
  } else if(e.target.classList.contains('select__option_change')){
      setSelectTheme( e.target.dataset.theme, e.target.innerText);
      toggleSelectActive();
  } else {
    toggleSelectActive();
  }
}

const getTheme = () => {
  if (localStorage.getItem('select')) {
    const {link, name} = JSON.parse(localStorage.getItem('select')); 
    THEME_LINK.href = link;
    CURRENT_OPTION.innerText = name;
  }
};

document.addEventListener('click', setTheme);
getTheme();