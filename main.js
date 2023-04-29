const startButton = document.querySelector("#startBtn");
const template = document.querySelector("#templateCard");
const main = document.querySelector("main");
const cards = document.querySelectorAll(".card");
const timer = document.querySelector("#board");

//addEventlistener//

startButton.addEventListener("click", startGame);



//Images on Array//

const data = [
  {
    backImgSrc: "images/310795.png",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/474477.jpg",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/310792.png",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/677323.jpg",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/673486.jpg",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/681068.png",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/611137.png",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/637788.jpg",
    frontImgSrc: "images/465254.jpg",
  },
];

const doubledData = [...data, ...data];

//random card//

function shuffle() {
  const clonedArray = [...doubledData];
  const randomArray = [];

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    const randomItem = clonedArray[randomIndex];

    randomArray.push(randomItem);
    clonedArray.splice(randomIndex, 1);
  }

  return randomArray;
}

// Start Game//

function startGame() {
  const cardsToRemove = document.querySelectorAll(".card");
  cardsToRemove.forEach((element) => main.removeChild(element));

  const shuffledCards = shuffle();
  shuffledCards.forEach(({ frontImgSrc, backImgSrc }) => {
    const card = template.content.cloneNode(true).querySelector(".card");
    card.querySelector(".cardFront img").src = frontImgSrc;
    card.querySelector(".cardBack img").src = backImgSrc;
    card.addEventListener("click", flipCard)
    main.appendChild(card);
  });

  
  totalTime = 60;
  countDown();
  setTimeout(stopTimer, 60000);
  
}
//flipCard//

function flipCard(event) {
this.classList.add("flipped");
  const flippedcard = document.querySelectorAll(".flipped:not(.matchCard)");
  if (flippedcard.length === 2) {
    compare(flippedcard);
  }
}

function removeClassFlip() {
}
//setTimeout(function(){flipCard = {}}, 6000);
//Compare//

function compare(comparedCard) {
  let card1 = comparedCard[0]
  let card2 = comparedCard[1]
  let card1Image = card1.firstElementChild.firstElementChild.src;
  let card2Image = card2.firstElementChild.firstElementChild.src;

  if (card1Image === card2Image) {
    card1.classList.add('matchCard');
    card2.classList.add('matchCard');
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }, 1000);
  }
}

// timer//

function countDown() {
  if(timer.textContent !== "finish") {
    totalTime--;
    timer.textContent = totalTime;
    setTimeout(countDown, 1000);
  } else {clearTimeout(countDown)};
  console.log(totalTime);
}

function stopTimer() {
    timer.textContent = "finish";

}