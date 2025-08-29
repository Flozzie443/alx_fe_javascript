// Initial local quotes
let localQuotes = [
    { id: 1, text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { id: 2, text: "Life is what happens when you're busy making other plans.", author: "John Lennon" }
];

// Simulate fetching quotes from server (JSONPlaceholder)
async function fetchQuotesFromServer() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        const serverData = await response.json();

        // Convert server posts to quote format
        return serverData.map(item => ({
            id: item.id,
            text: item.title,
            author: "Server Author"
        }));
    } catch (error) {
        console.error("Error fetching from server:", error);
        return [];
    }
}

// Simulate posting a new quote to the server
async function postQuoteToServer(quote) {
    try {
        await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(quote),
            headers: { "Content-Type": "application/json" }
        });
        console.log("Quote synced to server:", quote);
    } catch (error) {
        console.error("Error posting to server:", error);
    }
}

// Sync quotes with server (conflict resolution: server wins)
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();

    // Conflict resolution: if same ID, keep server version
    const mergedQuotes = [...localQuotes];
    serverQuotes.forEach(serverQuote => {
        const index = mergedQuotes.findIndex(q => q.id === serverQuote.id);
        if (index !== -1) {
            mergedQuotes[index] = serverQuote; // Replace with server data
        } else {
            mergedQuotes.push(serverQuote); // Add new
        }
    });

    localQuotes = mergedQuotes;
    localStorage.setItem("quotes", JSON.stringify(localQuotes));

    displayQuotes();
    notifyUser("Quotes synced with server!");
}

// Display quotes in the UI
function displayQuotes() {
    const container = document.getElementById("quote-list");
    container.innerHTML = "";
    localQuotes.forEach(quote => {
        const div = document.createElement("div");
        div.className = "quote";
        div.innerHTML = `<p>"${quote.text}" - ${quote.author}</p>`;
        container.appendChild(div);
    });
}

// Notify user about sync
function notifyUser(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

// Add a new quote locally and sync with server
document.getElementById("add-quote-btn").addEventListener("click", async () => {
    const text = document.getElementById("quote-text").value;
    const author = document.getElementById("quote-author").value;

    if (text && author) {
        const newQuote = { id: Date.now(), text, author };
        localQuotes.push(newQuote);
        localStorage.setItem("quotes", JSON.stringify(localQuotes));
        displayQuotes();
        await postQuoteToServer(newQuote);
    }
});

// Periodically sync with server every 10 seconds
setInterval(syncQuotes, 10000);

// Initial load
window.onload = () => {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        localQuotes = JSON.parse(storedQuotes);
    }
    displayQuotes();
};// Local quotes storage
let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Elements
const quoteText = document.getElementById("quote-text");
const newQuoteBtn = document.getElementById("new-quote");
const syncBtn = document.getElementById("sync-quotes");
const statusEl = document.getElementById("status");

// Mock API URL (JSONPlaceholder)
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Function to get random local quote
function getRandomQuote() {
    if (localQuotes.length === 0) {
        quoteText.textContent = "No quotes available locally. Sync with server.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * localQuotes.length);
    quoteText.textContent = localQuotes[randomIndex].text;
}

// Fetch quotes from mock server (simulate updates)
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Convert mock API data to quote objects
        const serverQuotes = data.slice(0, 5).map(item => ({
            id: item.id,
            text: item.title
        }));

        console.log("Fetched from server:", serverQuotes);
        return serverQuotes;
    } catch (error) {
        console.error("Error fetching from server:", error);
        return [];
    }
}

// Post new quote to server (simulation)
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quote)
        });
        const data = await response.json();
        console.log("Quote synced to server:", data);
    } catch (error) {
        console.error("Error posting to server:", error);
    }
}

// Sync local and server data with conflict resolution
async function syncQuotes() {
    statusEl.textContent = "Syncing with server...";
    const serverQuotes = await fetchQuotesFromServer();

    // Conflict resolution: server wins
    localQuotes = [...serverQuotes];
    localStorage.setItem("quotes", JSON.stringify(localQuotes));

    statusEl.textContent = "Quotes synced successfully!";
    console.log("Local storage after sync:", localQuotes);
}

// Add a new quote locally and sync to server
newQuoteBtn.addEventListener("click", async () => {
    const newQuote = {
        id: Date.now(),
        text: "Random Quote " + Math.floor(Math.random() * 100)
    };

    localQuotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(localQuotes));
    quoteText.textContent = newQuote.text;

    await postQuoteToServer(newQuote);
});

// Sync button
syncBtn.addEventListener("click", syncQuotes);

// Auto sync every 15 seconds (simulation)
setInterval(syncQuotes, 15000);

// Load initial quote
getRandomQuote();


("JavaScript is connected!");
