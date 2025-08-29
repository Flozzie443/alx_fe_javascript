// Initialize quotes array
let quotes = [];

// Load quotes from localStorage when page loads
window.onload = function () {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }

    // Load last viewed quote from session storage
    const lastQuote = sessionStorage.getItem('lastQuote');
    if (lastQuote) {
        document.getElementById('quoteDisplay').innerText = lastQuote;
    }
};

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display a random quote
function displayRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerText = 'No quotes available.';
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    const displayText = `"${quote.text}" - ${quote.category}`;
    document.getElementById('quoteDisplay').innerText = displayText;

    // Save to session storage
    sessionStorage.setItem('lastQuote', displayText);
}

// Add a new quote
function addQuote() {
    const text = document.getElementById('quoteText').value.trim();
    const category = document.getElementById('quoteCategory').value.trim();

    if (text && category) {
        quotes.push({ text, category });
        saveQuotes();
        alert('Quote added!');
        document.getElementById('quoteText').value = '';
        document.getElementById('quoteCategory').value = '';
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Export quotes as JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();

    URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert('Quotes imported successfully!');
            } else {
                alert('Invalid JSON format.');
            }
        } catch (e) {
            alert('Error reading file.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}
function showRandomQuote() {
  if (quotes.length === 0) {
    alert("No quotes available!");
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerText = `"${quote.text}" - ${quote.category}`;

  // Save last viewed quote
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}
window.onload = function() {
  loadQuotes();
  const lastQuote = sessionStorage.getItem('lastQuote');
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    document.getElementById("quoteDisplay").innerText = `"${quote.text}" - ${quote.category}`;
  }
};
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];
let lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function addQuote() {
  const text = document.getElementById('quoteText').value;
  const author = document.getElementById('quoteAuthor').value;
  const category = document.getElementById('quoteCategory').value;

  if (text && author && category) {
    quotes.push({ text, author, category });
    saveQuotes();
    populateCategories();
    displayQuotes();
    document.getElementById('quoteText').value = '';
    document.getElementById('quoteAuthor').value = '';
    document.getElementById('quoteCategory').value = '';
  } else {
    alert('Please fill in all fields.');
  }
}

function populateCategories() {
  const categoryDropdown = document.getElementById('categoryFilter');
  const categories = ['all', ...new Set(quotes.map(q => q.category))];

  // Clear existing options
  categoryDropdown.innerHTML = '';

  // Populate options
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    if (cat === lastSelectedCategory) option.selected = true;
    categoryDropdown.appendChild(option);
  });
}

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  lastSelectedCategory = selectedCategory;
  localStorage.setItem('selectedCategory', selectedCategory);
  displayQuotes();
}

function displayQuotes() {
  const container = document.getElementById('quoteContainer');
  container.innerHTML = '';

  const selectedCategory = document.getElementById('categoryFilter').value;

  let filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  filteredQuotes.forEach((quote, index) => {
    const div = document.createElement('div');
    div.classList.add('quote');
    div.innerHTML = `<p>"${quote.text}" - ${quote.author}</p><p><em>${quote.category}</em></p>`;
    container.appendChild(div);
  });
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
  populateCategories();
  displayQuotes();
});


