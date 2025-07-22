// Get references to DOM elements
const investBtn = document.getElementById('invest-btn');
const dialog = document.querySelector('dialog');
const summaryText = document.getElementById('investment-summary');
const inputAmount = document.getElementById('investment-amount');
let goldPrice = 0;

// SSE 
const eventSource = new EventSource('/api/price')

const priceDisplay = document.getElementById('price-display')

eventSource.onmessage = (event)=> {
  const data = JSON.parse(event.data)
  const price = data.goldPrice

  priceDisplay.textContent = price
  goldPrice = price ;
}
 eventSource.onerror = () => {
  console.log('Connection failed..')
 }



// Open dialog on invest button click
investBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submit

    const amount = parseFloat(inputAmount.value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid investment amount.");
        return;
    }

    // Simple fake calculation for demo 
    
    const grams = (amount / goldPrice).toFixed(3);

    summaryText.textContent = `You just bought ${grams} Gram Digital Gold for ₹${amount}. You will receive documentation shortly.`;

    dialog.showModal();
});

// Close dialog on OK button click
dialog.querySelector('button').addEventListener('click', () => {
    dialog.close();
});

