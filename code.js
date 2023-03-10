let data = [
  "מספר אחים",
  "מידת נעליים",
  "גובה",
  "חיית מחמד",
  "עונה אהובה",
  "צבע אהוב",
  "חג אהוב",
  "תחביב",
  "ספר אהוב",
  "סרט אהוב",
  "סדרה אהובה",
  "מאכל אהוב",
  "חייה אהובה",
  "ספורט אהוב",
  "צבע עיניים",
  "צבע גרביים",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
];

const SEASONS = 10;
const EPISODES = 24;
const BINGO_SQUERS = 16;

let isBingo = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
];

let currBingoSqure;

/* loading function
  --------------------------------------------------------------
  Description: */
window.addEventListener("load", () => {
  // document.querySelector(".randomEpisodeButton").addEventListener("click", generateRandomEpisode);
  createBingoBord();
});

const createBingoBord = () => {
  let phrases = shuffle(data).slice(0, 16);
  let squre;
  let row = 0;
  let column = 0;
  phrases.forEach((phrase) => {
    squre = El(
      "div",
      {
        id: `${row}${column}`,
        cls: "bingoSqure",
        listeners: { click: clickBingoSqure },
      },
      phrase
    );
    document.querySelector(".bingoContainer").append(squre);
    column++;
    if (column === 4) {
      row++;
      column = 0;
    }
  });
};

const clickBingoSqure = (event) => {
  currBingoSqure = event.currentTarget;
  document.querySelector(`#nameInput`).value = "";
  document.querySelector(`#name_popup`).classList.remove("hidden");
  document.querySelector(`#popupTitle`).innerText = `עם מי יש לכם ${event.currentTarget.innerText} במשותף?`;
  document.querySelector(`#closePopup`).addEventListener("click", closePopUp, {once: true});
};

const closePopUp = () => {
    if(document.querySelector(`#nameInput`).value != "") {
        currBingoSqure.removeEventListener("click", clickBingoSqure);
        currBingoSqure.style.backgroundColor = "var(--lightPurple)";
        let placement = currBingoSqure.id;
        isBingo[placement.slice(0, 1)][placement.slice(1)] = true;
        let name = El("div", {cls: "nameInSqure"},document.querySelector(`#nameInput`).value);
        currBingoSqure.append(name);
        checkForBingo();
    }
    document.querySelector(`#name_popup`).classList.add("hidden");
};

const checkForBingo = () => {
  isWinColum();
  isWinRow();
  isWinDiagonal1();
  isWinDiagonal2();
};

const wingame = () => {
  winConfetti();
};

const winConfetti = () => {
  document.querySelector(".bingoContainer").style.pointerEvents = "none";
  const start = () => {
    setTimeout(function () {
      confetti.start();
    }, 500); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
  };

  //  for stopping the confetti
  const stop = () => {
    setTimeout(function() {
        confetti.stop()
        // document.querySelector(".darkScreen").classList.remove("hidden");
        // document.querySelector(".restartButton").addEventListener("click", () => {
        //   window.location.reload();
        // });
    }, 10000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
  };
  // after this here we are calling both the function so it works
  start();
  stop();
};

const isWinRow = () => {
  // check for row
  let isWinRow = true;
  for (let colum = 0; colum < 4; colum++) {
    for (let row = 0; row < 4; row++) {
      if (!isBingo[row][colum]) {
        isWinRow = false;
      }
    }
    if (isWinRow) {
      wingame();
      console.log("ניצחון של טור");
    } else {
      isWinRow = true;
    }
  }
};

const isWinColum = () => {
  // check for colum
  let isWinColum = true;
  for (let row = 0; row < 4; row++) {
    for (let colum = 0; colum < 4; colum++) {
      if (!isBingo[row][colum]) {
        isWinColum = false;
      }
    }
    if (isWinColum) {
      wingame();
      console.log("ניצחון של שורה");
    } else {
      isWinColum = true;
    }
  }
};

const isWinDiagonal1 = () => {
  // check for diagonal1
  let isWinDiagonal1 = true;
  for (let colum = 0; colum < 4; colum++) {
    if (!isBingo[colum][colum]) {
      isWinDiagonal1 = false;
    }
  }
  if (isWinDiagonal1) {
    wingame();
    console.log("ניצחון של אלכסון");
  } else {
    isWinDiagonal1 = true;
  }
};

const isWinDiagonal2 = () => {
  // check for diagonal2
  let isWinDiagonal2 = true;
  for (let colum = 0; colum < 4; colum++) {
    if (!isBingo[colum][3 - colum]) {
      isWinDiagonal2 = false;
    }
  }
  if (isWinDiagonal2) {
    wingame();
    console.log("2ניצחון של אלכסון");
  } else {
    isWinDiagonal2 = true;
  }
};

const generateRandomEpisode = () => {
  let season = Math.floor(Math.random() * (SEASONS - 1) + 1);
  let episode;
  if (season === 10) {
    episode = Math.floor(Math.random() * (18 - 1) + 1);
  } else {
    episode = Math.floor(Math.random() * (EPISODES - 1) + 1);
  }

  document.querySelector(".randomEpisodeContainer").innerHTML = "";
  let episodeChoosen = El("div", {}, `season : ${season} episode : ${episode}`);
  document.querySelector(".randomEpisodeContainer").append(episodeChoosen);

  console.log(season);
  console.log(episode);
};

function shuffle(arr) {
  let tmp = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let index = Math.floor(Math.random() * tmp.length);
    arr[i] = tmp[index];
    tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
  }
  return arr;
}

/* El
  --------------------------------------------------------------
  Description: create html elements */
function El(tagName, options = {}, ...children) {
  let el = Object.assign(document.createElement(tagName), options.fields || {});
  if (options.classes && options.classes.length)
    el.classList.add(...options.classes);
  else if (options.cls) el.classList.add(options.cls);
  if (options.id) el.id = options.id;
  el.append(...children.filter((el) => el));
  for (let listenerName of Object.keys(options.listeners || {}))
    if (options.listeners[listenerName])
      el.addEventListener(listenerName, options.listeners[listenerName], false);
  for (let attributeName of Object.keys(options.attributes || {})) {
    if (options.attributes[attributeName] !== undefined)
      el.setAttribute(attributeName, options.attributes[attributeName]);
  }
  return el;
}
