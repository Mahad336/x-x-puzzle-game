const gridItems = document.querySelectorAll(".grid-item");
const btn = document.querySelector(".btn");
const msg = document.querySelector(".message");
const dmoves = document.querySelector(".d-moves");
const dtimer = document.querySelector(".d-timer");
const drounds = document.querySelector(".d-rounds");

let size = 3;
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

const renderItems = () => {
  let randomArray = shuffle(items);

  for (let i = 0, j = 0; i < gridItems.length; i++, j++) {
    if (i < 9) {
      if (randomArray[j] == 9) gridItems[i].innerHTML = "";
      else gridItems[i].innerHTML = randomArray[j];
      // if (items[j] == 9) gridItems[i].innerHTML = "";
      // else gridItems[i].innerHTML = items[j];
    } else {
      let newItem = document.createElement("div");
      newItem.classList.add("griditem");
      gridItems.append("box");
    }
  }
};

renderItems();

const getEmptyItem = () => {
  for (let i = 0; i <= gridItems.length; i++) {
    if (gridItems[i].innerHTML == "") return i + 1;
  }
};

const getAboveitemValue = () => {
  if (getEmptyItem() > 3) return gridItems[getEmptyItem() - 4].innerHTML;
  else return null;
};
const getAboveitem = () => {
  return getEmptyItem() - 3;
};

const keyUp = () => {
  let emptyitem = getEmptyItem();
  let aboveitemValue = getAboveitemValue();
  let aboveitem = getAboveitem();
  if (aboveitemValue != null) {
    gridItems[aboveitem - 1].innerHTML = "";
    gridItems[emptyitem - 1].innerHTML = aboveitemValue;
  }
};

const getBelowitemValue = () => {
  if (getEmptyItem() < 7) return gridItems[getEmptyItem() + 2].innerHTML;
  else return null;
};
const getBelowitem = () => {
  return getEmptyItem() + 3;
};

const keyDown = () => {
  let emptyitem = getEmptyItem();
  let belowitemValue = getBelowitemValue();
  let belowitem = getBelowitem();
  if (belowitemValue != null) {
    gridItems[belowitem - 1].innerHTML = "";
    gridItems[emptyitem - 1].innerHTML = belowitemValue;
  }
};

const getLeftitemValue = () => {
  if (getEmptyItem() != 1 && getEmptyItem() != 4 && getEmptyItem() != 7)
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
  }
};

const getRightitemValue = () => {
  if (getEmptyItem() != 3 && getEmptyItem() != 6 && getEmptyItem() != 9)
    return gridItems[getEmptyItem()].innerHTML;
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
      count++;
      dmoves.innerHTML = count;
      break;
    case "ArrowDown":
      keyDown();
      winCongrats();
      count++;
      dmoves.innerHTML = count;
      break;
    case "ArrowLeft":
      keyLeft();
      winCongrats();
      count++;
      dmoves.innerHTML = count;
      break;
    case "ArrowRight":
      keyRight();
      winCongrats();
      count++;
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
    targetitem == getemptyitem - 3 /* 3 is size */ ||
    targetitem == getemptyitem + 3 ||
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
