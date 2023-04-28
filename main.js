const startButton = document.querySelector("#startBtn");
const template = document.querySelector("#templateCard");
const main = document.querySelector("main");
const cards = document.querySelectorAll(".card");

startButton.addEventListener("click", startGame);



//Images on Array//

const data = [
  {
    backImgSrc: "images/310795.jpg",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/474477.jpg",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/677323.jpg",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/677323.jpg",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/677323.jpg",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/677323.jpg",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/677323.jpg",
    frontImgSrc: "images/465254.jpg",
  },
  {
    backImgSrc: "images/677323.jpg",
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

}  
function flipCard(event) {
this.classList.add("flipped");
  const flippedcard = document.querySelectorAll(".flipped:not(.matchCard)");
  if (flippedcard.length === 2) {
    compare(flippedcard);
  }
}

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
  //console.log(card1.firstElementChild.firstElementChild.src);
  //
}