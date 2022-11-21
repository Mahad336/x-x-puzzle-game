// window.onload = () => {

// }

const gridContainer = document.querySelector(".grid-container");
const gContainer = document.getElementById("g-container");
const btn = document.getElementById("btn");
const msg = document.querySelector(".message");
const dmoves = document.querySelector(".d-moves");
const dtimer = document.querySelector(".d-timer");
const drounds = document.querySelector(".d-rounds");
const des = document.getElementById("description");
const choose = document.getElementById("choose");
const input = document.getElementById("inputt");
const start = document.getElementById("start");
const target = document.getElementById("target");

let size = 5;

if (size < 6) {
  gridContainer.style.gridTemplateColumns = `repeat(${size},${
    (size * 13) / size
  }vw)`;
  gridContainer.style.gridTemplateRows = `repeat(${size},${
    (size * 10) / size
  }vh)`;
} else {
  gridContainer.style.gridTemplateColumns = `repeat(${size},${
    (size * (65 / size)) / size
  }vw)`;
  gridContainer.style.gridTemplateRows = `repeat(${size},${
    (size * (40 / size)) / size
  }vh)`;
}

let items = [];

for (let i = 1; i <= size * size; i++) items.push(i);

var count = 0;
var seconds = 0;
var hours = 0;
var minutes = 0;
var rounds;

let max = 0;
for (let i = 0; i < localStorage.length; i++) {
  let localkey = localStorage.key(i);
  if (localkey.includes("round")) {
    let b = parseInt(localStorage.getItem(localkey));
    if (b > max) max = b;
  } else continue;
}
let roundRecord = max;
console.log(roundRecord);
if (roundRecord != null && roundRecord > 0) rounds = roundRecord;
else rounds = 0;
drounds.innerHTML = rounds;

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

{
  //Setting font-size according to number of items
  if (size > 6) {
    for (let i = 0; i < gridItems.length; i++)
      `${(gridItems[i].style.fontSize = "x-large")}`;
  }
  if (size > 8) {
    for (let i = 0; i < gridItems.length; i++)
      `${(gridItems[i].style.fontSize = "large")}`;
  }

  if (size > 13) {
    for (let i = 0; i < gridItems.length; i++)
      `${(gridItems[i].style.fontSize = "medium")}`;
  }

  if (size > 18) {
    for (let i = 0; i < gridItems.length; i++)
      `${(gridItems[i].style.fontSize = "small")}`;
  }
}

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

const HandleClickInput = () => {
  document.addEventListener("click", HandleClick);
};

const HandleClick = (e) => {
  const arr = Array.from(gridItems);
  let targetitem = arr.indexOf(e.target) + 1;
  let getemptyitem = getEmptyItem();
  let gettargetvalue = e.target.innerHTML;

  if (
    (targetitem == getemptyitem - size /* 3 is size */ ||
      targetitem == getemptyitem + size ||
      targetitem == getemptyitem + 1 /* next position*/ ||
      targetitem == getemptyitem - 1) /* previous position*/ &&
    e.target.getAttribute("class").includes("grid-item")
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

const roundShuffle = () => {
  let randomArray = shuffle(items);

  for (let i = 0; i < gridItems.length; i++) {
    if (randomArray[i] == gridItems.length) gridItems[i].innerHTML = "";
    else gridItems[i].innerHTML = randomArray[i];
  }
};

let temp = []; //rounds html data

btn.addEventListener("click", () => {
  roundShuffle();
  let duration = `${hours}:${minutes}:${seconds}`;
  rounds++;
  localStorage.setItem("moves" + rounds, count);
  localStorage.setItem("duration" + rounds, duration);
  localStorage.setItem("round" + rounds, rounds);

  count = 0;
  seconds = 0;
  hours = 0;
  minutes = 0;

  msg.style.display = "none";
  drounds.innerHTML = rounds;
  dmoves.innerHTML = count;

  // temp.push(
  //   `<div class="description description1" id="description">
  //       <div class="moves sub-d">
  //         <p class="head h-moves">Moves</p>
  //         <p class="des d-moves">${localStorage.getItem(`moves${rounds}`)}</p>
  //       </div>
  //       <div class="timer sub-d">
  //         <p class="head h-timer">Duration</p>
  //         <p class="des d-timer">${localStorage.getItem(
  //           `duration${rounds}`
  //         )}</p>
  //       </div>
  //       <div class="rounds sub-d">
  //         <p class="head h-rounds">Rounds</p>
  //         <p class="des d-rounds">${localStorage.getItem(`round${rounds}`)}</p>
  //       </div>
  //     </div>`
  // );
  window.location.reload();
});

const renderDetails = () => {
  for (let i = 1; i < localStorage.length / 3 - 1; i++) {
    temp.push(
      `<div class="description description1" id="description">
        <div class="moves sub-d">
          <p class="head h-moves">Moves</p>
          <p class="des d-moves">${localStorage.getItem(`moves${i}`)}</p>
        </div>
        <div class="timer sub-d">
          <p class="head h-timer">Duration</p>
          <p class="des d-timer">${localStorage.getItem(`duration${i}`)}</p>
        </div>
        <div class="rounds sub-d">
          <p class="head h-rounds">Round</p>
          <p class="des d-rounds">${localStorage.getItem(`round${i}`)}</p>
        </div>
      </div>`
    );
  }
  target.innerHTML = temp.reverse();
};

renderDetails();
//localStorage.clear();
