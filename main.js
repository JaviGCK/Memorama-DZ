window.addEventListener("load", firstPage);
// insertAdjacentHTML //
//This function creates the first page that we will see,
// which has a button to go to the next page.
function firstPage() {
const bodypage = document.querySelector("body");
bodypage.insertAdjacentHTML("beforeend", `
<section class="startPage" id="current-page">
  <form>
    <label for="user">UserName</label>
    <input type="text" id="userInput" name="user"/>
  </form>
   <button class="startGameButton" id="startGameButton">Play Game</button>
</section>
`);
const playGame = document.querySelector("#startGameButton");
playGame.addEventListener("click", nextPage);
}

function nextPage() {
  const userInput = document.querySelector("#userInput").value;
  localStorage.setItem("userName", userInput);
  const bodypage = document.querySelector("body");
  const lastPage = document.querySelector("#current-page");
  lastPage.remove();
  bodypage.insertAdjacentHTML("beforeend", `
  <section class="userGame" id="userGame">
    <ul class="users">User Scores</h2>
      
    </ul>
  </section>

  <main>
    <template id="templateCard">
      <div class="card" id="card">
        <div class="cardBack">
          <img src="" alt="">
        </div>
        <div class="cardFront">
          <img src="" alt="">
          </div>
        </div>
    </template>
  </main>
  <section class="boardTimeStartGame" id="boardTimeStartGame">
  <button id="startBtn" class="startBtn">START</button>
  <div class ="userNameBoard">
    <p>User</p>
      
  </div>
  <div class="scoreBoardItem">
    <p>Point</p>
    <span class="scoreBoardPoint" id="score"></span>
  </div>
  <div class="scoreBoardItem">
    <p>Time</p>
    <span class="scoreBoardTime" id="board"></span>
  </div>
  </section>
  `);
  const startButton = document.querySelector("#startBtn");
  startButton.addEventListener("click", startGame);
}

//Last page finish Game//

function gameOver() {
  const bodypage = document.querySelector("body");
  bodypage.insertAdjacentHTML("beforeend", `
  </section>
    <section class="loserPage" id="loserPage">
        <h2 class="yourLost">Your Lost!</h2>
        <span>

        </span>
        <button class="playAgain" id="playAgain">Play again</button>
    </section>
  `);
  const playAgainLoser = document.querySelector("#loserPage");
  playAgainLoser.addEventListener("click", removeFinalPage);
  removeFinalPage();
}

function finishGame() {
  const bodypage = document.querySelector("body");
  bodypage.insertAdjacentHTML("beforeend", `
  <section class="winnerPage" id="winnerPage">
        <h2 class="yourWon">Your Won!</h2>
        <div id="winnerPoint">

        </div>
        <button class="playAgain" id="playAgain">Play again</button>
    </section>
  `); 
  const scoreBoard = document.querySelector("#score");
  const winnerScore = document.querySelector("#winnerPoint")
  winnerScore.textContent =  scoreBoard.textContent + " points";
  localStorage.setItem("Pointuser", winnerScore.textContent);
  const playAgainWinner = document.querySelector("#winnerPage");
  playAgainWinner.addEventListener("click", removeFinalPage);
  const userName = localStorage.getItem("userName");
  const totalPoints = localStorage.getItem("Pointuser");
  const finalScore = {
    name: userName,
    score: totalPoints
  };
  let rankingData;
  if(localStorage.getItem("rankingData") !== null) {
    rankingData = JSON.parse(localStorage.getItem("rankingData"));
    
  } else { 
    console.log("estoy dentro");
    rankingData = [];
   
  }
  console.log(rankingData);
  rankingData.unshift(finalScore);
  localStorage.setItem("rankingData", JSON.stringify(rankingData));

  const userList = document.querySelector(".user");
  for (let i = 0; i < 6; i++) {
    const li = document.createElement("li");
    li.innerText = `${rankingData[i].name}: ${rankingData[i].score}`;
    userList.appendChild(li);
  }

}

function removeFinalPage() {
  const playAgainWinner = document.querySelector("#winnerPage");
  const playAgainLoser = document.querySelector("#loserPage");
  if(playAgainWinner === null) playAgainLoser.remove();
  else playAgainWinner.remove();
  
}
//Images on Array//

const data = [
  {
    backImgSrc: "images/310795.jpg",
    frontImgSrc: "images/illustration-minimalism-text-logo-orange-circle-213808-wallhere.com.jpg",
  },
  {
    backImgSrc: "images/474477.jpg",
    frontImgSrc: "images/illustration-minimalism-text-logo-orange-circle-213808-wallhere.com.jpg",
  },
  {
    backImgSrc: "images/310792.png",
    frontImgSrc: "images/illustration-minimalism-text-logo-orange-circle-213808-wallhere.com.jpg",
  },
  {
    backImgSrc: "images/677323.jpg",
    frontImgSrc: "images/illustration-minimalism-text-logo-orange-circle-213808-wallhere.com.jpg",
  },
  {
    backImgSrc: "images/673486.jpg",
    frontImgSrc: "images/illustration-minimalism-text-logo-orange-circle-213808-wallhere.com.jpg",
  },
  {
    backImgSrc: "images/681068.png",
    frontImgSrc: "images/illustration-minimalism-text-logo-orange-circle-213808-wallhere.com.jpg",
  },
  {
    backImgSrc: "images/611137.png",
    frontImgSrc: "images/illustration-minimalism-text-logo-orange-circle-213808-wallhere.com.jpg",
  },
  {
    backImgSrc: "images/637788.jpg",
    frontImgSrc: "images/illustration-minimalism-text-logo-orange-circle-213808-wallhere.com.jpg",
  },
];

const doubledData = [...data, ...data];

// Start Game//

function startGame() {
  const timer = document.querySelector("#board");
  const template = document.querySelector("#templateCard");
  const main = document.querySelector("main");
  const cards = document.querySelectorAll(".card");
  const scoreBoard = document.querySelector("#score");
  clearInterval(countIntervalId);
  timer.textContent = "";
  scoreBoard.textContent = ""
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

  timeS();

  finishTimer();
}

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

//flipCard//

function flipCard() {

  const timer = document.querySelector("#board");
  if (timer.textContent !== "finish") {
    this.classList.add("flipped");
  } else { this.classList.remove("flipped"); }
  const flippedcard = document.querySelectorAll(".flipped:not(.matchCard)");
  if (flippedcard.length === 2) {
    compare(flippedcard);
  }


} 

//Compare//

function compare(comparedCard) {
  const scoreBoard = document.querySelector("#score");
  const timer = document.querySelector("#board");
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
  const totalMatch = document.querySelectorAll(".matchCard");
  if (totalMatch.length === 16) {
    clearInterval(countIntervalId);
    clearTimeout(generalTimer);
    scoreBoard.textContent = timer.textContent;
    setTimeout(() => {
      finishGame();
      
    }, 3000);
  }
}

// timer//
let generalTimer;
function finishTimer() {
  const timer = document.querySelector("#board");
  generalTimer = setTimeout(() => {
    timer.textContent = "finish";
    setTimeout(() => {
      gameOver();
    }, 3000);
  }, 100000);
}

let countIntervalId;
function timeS() {
  const timer = document.querySelector("#board");
  let totalTime = 100;
  countIntervalId = setInterval(() => {
    if (timer.textContent !== "finish") {
      totalTime--;
      timer.textContent = totalTime;
    } else {
      clearInterval(countIntervalId);
    }
  }, 1000);
}



//Save Data//

function saveData() {
  
}

function recoveryData() {
  
}

//I have to finish the css styles, 
//have the point data added to the saved point data
// and display in the user scores part
