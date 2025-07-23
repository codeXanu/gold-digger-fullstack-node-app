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


let lastDownloadLink = '';

// Open dialog on invest button click
investBtn.addEventListener('click', async (e) => {
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

    const investmentData = {
        goldPrice,
        amount,
        grams
    };
    const res = await fetch('/api/invest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(investmentData)
    });

    if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        lastDownloadLink = url; // Save blob URL for download button
        // console.log('PDF blob URL:', url);
    } else {
        alert('Failed to generate investment PDF.');
    }
});

// Download PDF button
document.getElementById('download-pdf-btn').addEventListener('click', () => {
    if (lastDownloadLink) {
        const a = document.createElement('a');
        a.href = lastDownloadLink;
        a.download = 'gold-investment-receipt.pdf';
        a.click();
    } else {
        alert("PDF not available yet.");
    }
});

// Close dialog on OK button click
document.getElementById('close-dialog-btn').addEventListener('click', () => {
    dialog.close();
});

