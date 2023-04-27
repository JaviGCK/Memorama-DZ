const startButton = document.querySelector("#startBtn");
const template = document.querySelector("#templateCard");
const board = document.querySelector("#board");


//startButton.addEventListener("click", startGame);//

const main = document.querySelector("main");
      const templateCard = document.querySelector("#templateCard");

      const data = [
        {
          frontImgSrc: "images/310795.jpg",
          backImgSrc: "images/465254.jpg",
        },
        {
          frontImgSrc: "images/474477.jpg",
          backImgSrc: "images/465254.jpg",
        },
        {
          frontImgSrc: "images/677323.jpg",
          backImgSrc: "images/465254.jpg",
        },
        {
            frontImgSrc: "images/677323.jpg",
            backImgSrc: "images/465254.jpg",
        },
        {
            frontImgSrc: "images/677323.jpg",
            backImgSrc: "images/465254.jpg",
        },
        {
            frontImgSrc: "images/677323.jpg",
            backImgSrc: "images/465254.jpg",
        },
        {
            frontImgSrc: "images/677323.jpg",
            backImgSrc: "images/465254.jpg",
        },
        {
            frontImgSrc: "images/677323.jpg",
            backImgSrc: "images/465254.jpg",
        },
          
      ];

      data.forEach(({ frontImgSrc, backImgSrc }) => {
        const card = templateCard.content.cloneNode(true).querySelector("#card");
        card.querySelector(".cardFront img").src = frontImgSrc;
        card.querySelector(".cardBack img").src = backImgSrc;
        main.appendChild(card);
      });
