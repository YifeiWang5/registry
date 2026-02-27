// --- CONFIGURATION ---
const VENMO_USERNAME = "Matt-Goldsmith-4"; // Replace with your actual Venmo handle (no @ symbol)

const expenses = [
    {
        id: 1,
        title: "Roundtrip Flights",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
        defaultAmount: 1000,
        note: "Help us get to Kauai! ✈️"
    },
    {
        id: 2,
        title: "Rental Car",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
        defaultAmount: 600,
        note: "Getting around on the island"
    },
    {
        id: 3,
        title: "Kayak",
        image: "https://images.unsplash.com/photo-1533587851505-d119e1319b7f?auto=format&fit=crop&w=600&q=80",
        defaultAmount: 300,
        note: "Snorkeling and adventures 🐠"
    },
    // {
    //     id: 4,
    //     title: "Excursion Fund",
    //     image: "https://images.unsplash.com/photo-1533587851505-d119e1319b7f?auto=format&fit=crop&w=600&q=80",
    //     defaultAmount: 300,
    //     note: "Snorkeling and adventures 🐠"
    // }
];

// --- APP LOGIC ---
const grid = document.getElementById('registry-grid');

// Generate the cards dynamically
expenses.forEach(expense => {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <img src="${expense.image}" alt="${expense.title}" class="card-image" loading="lazy">
        <div class="card-content">
            <h2 class="card-title">${expense.title}</h2>
            <p class="card-note">${expense.note}</p>
            <div class="input-group">
                <span>$</span>
                <input type="number" id="amount-${expense.id}" value="${expense.defaultAmount}" min="1" step="1">
            </div>
            <button class="btn" onclick="processPayment(${expense.id})">Gift via Venmo</button>
        </div>
    `;
    grid.appendChild(card);
});

// Handle the Venmo redirect
window.processPayment = function(id) {
    const expense = expenses.find(e => e.id === id);
    const amountInput = document.getElementById(`amount-${id}`);
    const amount = parseFloat(amountInput.value).toFixed(2);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // Format the note for the Venmo URL
    const note = encodeURIComponent(`Registry: ${expense.title} - ${expense.note}`);
    
    // Construct the Venmo Deeplink/Web link
    const venmoUrl = `https://venmo.com/?txn=pay&recipients=${VENMO_USERNAME}&amount=${amount}&note=${note}`;
    
    // Open Venmo in a new tab (or triggers the app on mobile)
    window.open(venmoUrl, '_blank');
};
