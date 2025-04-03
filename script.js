const countries = [
    { name: "United States", src: "https://flagpedia.net/data/flags/h80/us.png" },
    { name: "Germany", src: "https://flagpedia.net/data/flags/h80/de.png" },
    { name: "Japan", src: "https://flagpedia.net/data/flags/h80/jp.png" },
    { name: "Brazil", src: "https://flagpedia.net/data/flags/h80/br.png" },
    { name: "France", src: "https://flagpedia.net/data/flags/h80/fr.png" },
    { name: "India", src: "https://flagpedia.net/data/flags/h80/in.png" },
    { name: "Canada", src: "https://flagpedia.net/data/flags/h80/ca.png" },
    { name: "Australia", src: "https://flagpedia.net/data/flags/h80/au.png" }
  ];
  
  // Duplicate and shuffle cards
  const duplicatedCountries = [...countries, ...countries];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }
  
  shuffleArray(duplicatedCountries);
  
  const cardsContainer = document.getElementById("game-cards");
  const startButton = document.querySelector(".btn");
  const flipCounterElement = document.getElementById("flip-counter");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("timer");
  
  let selectedCards = [];
  let isFlipping = false;
  let flipCount = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  
  // Start Game
  startButton.addEventListener("click", () => {
    cardsContainer.innerHTML = ""; 
    flipCount = 0;
    score = 0;
    timeLeft = 30;
    updateUI();
  
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time: ${timeLeft}s`;
      if (timeLeft === 0) {
        clearInterval(timer);
        alert("Time's up! Your Score: " + score);
      }
    }, 1000);
  
    shuffleArray(duplicatedCountries);
  
    duplicatedCountries.forEach((country) => {
      const card = document.createElement("div");
      card.classList.add("flip-card");
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front p-3">
            <h5>Click to Flip</h5>
          </div>
          <div class="flip-card-back p-3">
            <img src="${country.src}" alt="${country.name}">
          </div>
        </div>
      `;
      card.dataset.flag = country.src;
      cardsContainer.appendChild(card);
    });
  
    document.querySelectorAll(".flip-card").forEach((card) => {
      card.addEventListener("click", () => {
        if (isFlipping || card.classList.contains("flipped")) return;
        
        card.classList.add("flipped");
        selectedCards.push(card);
        flipCount++;
        updateUI();
  
        if (selectedCards.length === 2) {
          isFlipping = true;
          const [firstCard, secondCard] = selectedCards;
          
          if (firstCard.dataset.flag === secondCard.dataset.flag) {
            setTimeout(() => {
              firstCard.remove();
              secondCard.remove();
              score += 10;
              selectedCards = [];
              isFlipping = false;
              updateUI();
            }, 1000);
          } else {
            setTimeout(() => {
              firstCard.classList.remove("flipped");
              secondCard.classList.remove("flipped");
              selectedCards = [];
              isFlipping = false;
            }, 2000);
          }
        } else if (selectedCards.length === 3) {
          selectedCards[0].classList.remove("flipped");
          selectedCards[1].classList.remove("flipped");
          selectedCards = [selectedCards[2]];
        }
      });
    });
  });
  
  function updateUI() {
    flipCounterElement.textContent = `Flips: ${flipCount}`;
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${timeLeft}s`;
  }