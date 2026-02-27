// --- CONFIGURATION ---
const VENMO_USERNAME = "Matt-Goldsmith-4"; // Replace with your actual Venmo handle (no @ symbol)

const expenses = [
    {
        id: 1,
        title: "Roundtrip Flights",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
        defaultAmount: 1000,
        note: "Help us get to Kauai and back! ✈️"
    },
    {
        id: 2,
        title: "Rental Car",
        image: "https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&w=600&q=80",
        defaultAmount: 600,
        note: "Help us get around on the island and explore Kauai's scenic drives! 🚗💨"
    },
    // {
    //     id: 3,
    //     title: "Kayak",
    //     image: "https://images.unsplash.com/photo-1533587851505-d119e1319b7f?auto=format&fit=crop&w=600&q=80",
    //     defaultAmount: 300,
    //     note: "Snorkeling and adventures 🐠"
    // },
    {
        id: 3,
        title: "Na Pali Coast Boat Tour",
        image: "https://images.unsplash.com/photo-1574888126749-9f4a132de9bd?auto=format&fit=crop&w=600&q=80", 
        defaultAmount: 250,
        note: "Help us sail along the stunning Na Pali cliffs! ⛵"
    },
    {
        id: 4,
        title: "Waimea Canyon Hike Picnic",
        image: "./assets/hiking-photo.jpg", // Example of a local image asset!
        defaultAmount: 100,
        note: "Fuel for our hike through the 'Grand Canyon of the Pacific.' 🥾"
    },
];

// 💡 TIP: For local images, create an "assets" folder in your repository, upload your 
// pictures there, and use the path like "./assets/my-picture.jpg" in the image field.

// const expenses = [
    
//     {
//         id: 2,
//         title: "Traditional Hawaiian Luau",
//         image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=600&q=80",
//         defaultAmount: 100,
//         note: "Poi, Kalua pig, and fire dancing. Treat us to an unforgettable night of Hawaiian culture! 🌺"
//     },
//     {
//         id: 3,
//         title: "Hawaiian Shave Ice Fund",
//         image: "https://images.unsplash.com/photo-1493925439164-968bfa17c669?auto=format&fit=crop&w=600&q=80",
//         defaultAmount: 15,
//         note: "It gets hot in the tropics! Keep us cool with a Macadamia nut ice cream-stuffed shave ice. 🍧"
//     },
//     
//     {
//         id: 5,
//         title: "Dog Boarding & Treats",
//         image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
//         defaultAmount: 50,
//         note: "Peace of mind for us, and extra belly rubs and treats for the pup while we're away! 🐕"
//     }
// ];

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
