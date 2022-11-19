const gridContainer = document.querySelector(".grid-container");
const gContainer = document.getElementById("g-container");
const btn = document.querySelector(".btn");
const msg = document.querySelector(".message");
const dmoves = document.querySelector(".d-moves");
const dtimer = document.querySelector(".d-timer");
const drounds = document.querySelector(".d-rounds");

let size = 7;
gridContainer.style.gridTemplateColumns = `repeat(${size},${
  (size * 13) / size
}vw)`;
gridContainer.style.gridTemplateRows = `repeat(${size},${
  (size * 10) / size
}vh)`;
let items = [];

for (let i = 1; i <= size * size; i++) items.push(i);

var count = 0;
var seconds = 0;
var hours = 0;
var minutes = 0;
var rounds = 0;

function shuffle(array) {
  var tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
}
const makeItems = () => {
  let randomArray = shuffle(items);

  for (let i = 0; i < randomArray.length; i++) {
    let newItem = document.createElement("div");
    newItem.classList.add("grid-item");
    newItem.classList.add(`grid-item-${i + 1}`);
    if (randomArray[i] == size * size) newItem.innerHTML = "";
    else newItem.innerHTML = randomArray[i];
    gContainer.appendChild(newItem);
  }
};
makeItems();

const gridItems = document.querySelectorAll(".grid-item");

const renderItems = () => {};

renderItems();

const getEmptyItem = () => {
  for (let i = 0; i <= gridItems.length; i++) {
    if (gridItems[i].innerHTML == "") return i + 1;
  }
};

const getAboveitemValue = () => {
  if (getEmptyItem() > size)
    return gridItems[getEmptyItem() - size - 1].innerHTML;
  else return null;
};

const getAboveitem = () => {
  return getEmptyItem() - size;
};

const keyUp = () => {
  let emptyitem = getEmptyItem();
  let aboveitemValue = getAboveitemValue();
  let aboveitem = getAboveitem();
  if (aboveitemValue != null) {
    gridItems[aboveitem - 1].innerHTML = "";
    gridItems[emptyitem - 1].innerHTML = aboveitemValue;
    count++;
  }
};

const getBelowitemValue = () => {
  if (getEmptyItem() < size * size - size + 1)
    return gridItems[getEmptyItem() + size - 1].innerHTML;
  else return null;
};
const getBelowitem = () => {
  return getEmptyItem() + size;
};

const keyDown = () => {
  let emptyitem = getEmptyItem();
  let belowitemValue = getBelowitemValue();
  let belowitem = getBelowitem();
  if (belowitemValue != null) {
    gridItems[belowitem - 1].innerHTML = "";
    gridItems[emptyitem - 1].innerHTML = belowitemValue;
    count++;
  }
};

const getLeftitemValue = () => {
  if (getEmptyItem() % size != 1)
    return gridItems[getEmptyItem() - 2].innerHTML;
  else return null;
};
const getLeftitem = () => {
  return getEmptyItem() - 1;
};

const keyLeft = () => {
  let emptyitem = getEmptyItem();
  let leftitemValue = getLeftitemValue();
  let leftitem = getLeftitem();
  if (leftitemValue != null) {
    gridItems[leftitem - 1].innerHTML = "";
    gridItems[emptyitem - 1].innerHTML = leftitemValue;
    count++;
  }
};

const getRightitemValue = () => {
  if (getEmptyItem() % size != 0) return gridItems[getEmptyItem()].innerHTML;
  else return null;
};
const getRightitem = () => {
  return getEmptyItem() + 1;
};

const keyRight = () => {
  let emptyitem = getEmptyItem();
  let rightitemValue = getRightitemValue();
  let rightitem = getRightitem();
  if (rightitemValue != null) {
    gridItems[rightitem - 1].innerHTML = "";
    gridItems[emptyitem - 1].innerHTML = rightitemValue;
    count++;
  }
};

function handleInput() {
  document.addEventListener("keydown", handlePress);
}
function handlePress(e) {
  switch (e.key) {
    case "ArrowUp":
      keyUp();
      winCongrats();
      dmoves.innerHTML = count;
      break;
    case "ArrowDown":
      keyDown();
      winCongrats();
      dmoves.innerHTML = count;
      break;
    case "ArrowLeft":
      keyLeft();
      winCongrats();
      dmoves.innerHTML = count;
      break;
    case "ArrowRight":
      keyRight();
      winCongrats();
      dmoves.innerHTML = count;
      break;
  }
}

handleInput();

const winCongrats = () => {
  let won = false;
  for (let i = 0, j = 1; i < gridItems.length - 1; i++, j++) {
    if (gridItems[i].innerHTML == j) {
      won = true;
      continue;
    } else {
      won = false;
      break;
    }
  }
  if (won == true) msg.style.display = "flex";
};

const handleClickInput = () => {
  document.addEventListener("click", (e) => {});
};

const HandleClickInput = () => {
  document.addEventListener("click", HandleClick);
};

const HandleClick = (e) => {
  const arr = Array.from(gridItems);

  let getemptyitem = getEmptyItem();
  let targetitem = arr.indexOf(e.target) + 1;
  let gettargetvalue = e.target.innerHTML;

  if (
    targetitem == getemptyitem - size /* 3 is size */ ||
    targetitem == getemptyitem + size ||
    targetitem == getemptyitem + 1 /* next position*/ ||
    targetitem == getemptyitem - 1 /* previous position*/
  ) {
    let temp = gettargetvalue;
    e.target.innerHTML = "";
    gridItems[getemptyitem - 1].innerHTML = temp;
    winCongrats();
    count++;
    dmoves.innerHTML = count;
  }
};

HandleClickInput();

const timer = () => {
  seconds += 1;

  if (seconds == 60) {
    minutes += 1;
    seconds = 0;
  }
  if (minutes == 60) {
    hours += 1;
    minutes = 0;
    seconds = 0;
  }
  if (hours == 24) {
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  dtimer.innerHTML = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds} `;
};

timer();

setInterval(timer, 1000);

btn.addEventListener("click", () => {
  renderItems();
  count = 0;
  seconds = 0;
  hours = 0;
  minutes = 0;
  rounds++;
  msg.style.display = "none";
  drounds.innerHTML = rounds;
  dmoves.innerHTML = count;
});
