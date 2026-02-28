// --- CONFIGURATION ---
const VENMO_USERNAME = "Matt-Goldsmith-4"; // Replace with your actual Venmo handle (no @ symbol)

const expenses = [
    {
        id: 1,
        title: "Waimea Canyon Hike Picnic",
        image: "./assets/hiking-photo.jpg", 
        defaultAmount: 100,
        note: "Fuel for our hike through the 'Grand Canyon of the Pacific.' 🥾"
    },
    {
        id: 2,
        title: "Water Gears Rental",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
        defaultAmount: 500,
        note: "For surf and snorkel gears to explore the beaches! 🐠"
    },
    {
        id: 3,
        title: "Na Pali Coast Boat Tour",
        image: "./assets/boat.jpg", 
        defaultAmount: 500,
        note: "Help us sail along the stunning Na Pali cliffs! ⛵"
    },
    {
        id: 4,
        title: "Helicopter Waterfall Tour",
        image: "/assets/heli.jpg",
        defaultAmount: 650,
        note: "A bird's-eye view of the Manawaiopuna Falls (the Jurassic Park waterfall)! 🚁"
    },
    {
        id: 5,
        title: "Roundtrip Flights",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
        defaultAmount: 1000,
        note: "Help us get to Kauai and back! ✈️"
    },
    {
        id: 6,
        title: "Rental Car",
        // image: "https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&w=600&q=80",
        image: "https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&w=600&q=80",
        defaultAmount: 600,
        note: "Help us get around on the island and explore Kauai's scenic drives! 🚗💨"
    }
    
];

// --- APP LOGIC ---
const grid = document.getElementById('registry-grid');

// Generate the cards dynamically
expenses.forEach(expense => {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Notice the new <p class="edit-hint"> added below to help non-tech-savvy users!
    card.innerHTML = `
        <img src="${expense.image}" alt="${expense.title}" class="card-image" loading="lazy">
        <div class="card-content">
            <h2 class="card-title">${expense.title}</h2>
            <p class="card-note">${expense.note}</p>
            
            <div class="amount-container">
                <p class="edit-hint" style="font-size: 0.85rem; color: #008CFF; font-weight: 600; margin-bottom: 0.5rem;">
                    👇 You can change this amount!
                </p>
                <div class="input-group">
                    <span>$</span>
                    <input type="number" id="amount-${expense.id}" value="${expense.defaultAmount}" min="1" step="1" aria-label="Amount to gift">
                </div>
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
    const note = encodeURIComponent(`Kauai Trip: ${expense.title} - ${expense.note}`);
    
    // Construct the Venmo Deeplink/Web link
    const venmoUrl = `https://venmo.com/?txn=pay&recipients=${VENMO_USERNAME}&amount=${amount}&note=${note}`;
    
    // Open Venmo in a new tab (or triggers the app on mobile)
    window.open(venmoUrl, '_blank');
};
