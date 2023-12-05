class QuoteApp {
  constructor() {
    this.diceContainer = document.getElementById('dice-container');
    this.adviceText = document.getElementById('advice-text');
    this.adviceId = document.getElementById('advice-number');
    this.initialQuoteDisplayed = false;
    
    this.diceContainer.addEventListener("click", () => this.handleDiceClick());


    this.updateAdvice("It is easy to sit up and take notice, what's difficult is getting up and taking action.", "117");

    
    this.fetchAndDisplayAdvice();
  }

  fetchAndDisplayAdvice() {
    console.log('Fetching advice...'); 
    const apiUrl = 'https://api.adviceslip.com/advice?timestamp=' + Date.now();

    // Make a GET request
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (this.initialQuoteDisplayed) {
          this.updateAdvice(data.slip.advice, data.slip.id);
        } else {
          // Skip updating on initial load
          this.initialQuoteDisplayed = true;
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }

  handleDiceClick() {
    console.log('Dice container clicked'); 
    this.fetchAndDisplayAdvice();
  }

  updateAdvice(advice, id) {
    this.adviceText.textContent = advice;
    this.adviceId.textContent = "Advice #" + id;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const quoteApp = new QuoteApp();
});
