/*************************************************************************** */
const grids = document.querySelectorAll('.columns');
const displayColor = document.querySelector('#display-color');
const head = document.querySelector('.head');
const start = document.querySelector('#start');
const determineColor = document.querySelector('.determine-color');
let pickedColor = '';

//function generates random numbers from 1 to a
const randomNumber = num => {
  return Math.floor(Math.random() * num) + 1;
};

//function generates random rgb colors
const generateRandomColor = num => {
  return `rgb(${randomNumber(num)} ,${randomNumber(num)} ,${randomNumber(
    num
  )})`;
};

// loop through each grid and assign random color to each
const restart = () => {
  /*  blinker.classList.remove('blink');
  displayColor.classList.remove('blink'); */
  head.style.background = 'white';
  grids.forEach(grid => {
    grid.classList.remove('transit');
    grid.classList.remove('invisible');
    grid.style.background = generateRandomColor(255);
  });
};

//******************************************************************************** */
//function selects one of the random colors generated and sets it as the color to be determned
const setColor = () => {
  //gets background color of each square and pushes it into an array colors
  const colors = [];
  grids.forEach(grid => {
    colors.push(grid.style.background);
  });

  pickedColor = colors[randomNumber(9) - 1];
  displayColor.textContent = pickedColor;
  return pickedColor;
};

/********************************************************************************** */
//listens for grid selection and checks if slected grid color is same as the color to be determined
const checkValidity = (color, grid) => {
  if (color === pickedColor) {
    grids.forEach(grid => {
      grid.classList.remove('invisible');
      grid.style.background = pickedColor;
      grid.classList.add('transit');
    });
    head.style.background = pickedColor;

    head.classList.add('transit');
    determineColor.style.display = 'block';
  } else {
    grid.style.background = 'white';
    grid.style.transition = 'background linear 300ms';
    setTimeout(() => {
      grid.classList.add('invisible');
    }, 300);
  }
};

const uiInteract = () => {
  grids.forEach(grid => {
    grid.addEventListener('click', () => {
      let clickedColor = grid.style.background;
      checkValidity(clickedColor, grid);
    });
  });
};

/********************************************************************************* */
const startApp = () => {
  restart();
  setColor();
  uiInteract();
  determineColor.style.display = 'none';
};

start.addEventListener('click', startApp);

/* ************************************utility*************************** */
setInterval(() => {
  determineColor.classList.toggle('blink');
}, 500);
