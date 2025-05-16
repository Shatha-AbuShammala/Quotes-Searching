const API_URL = "https://dummyjson.com/quotes";
const searchInput = document.getElementById("search");
const quotelist = document.getElementById("quoteList");
const errorMessage = document.getElementById("error");

let allQuotes = [];

fetch(API_URL)
  .then(res => {
    if (!res.ok) {
      throw new Error("Unable to fetch quotes.");
    }
    return res.json();
  })
  .then(result => {
    allQuotes = result.quotes;
    displayQuotes(allQuotes);
  })
  .catch(error => {
    errorMessage.textContent = error.message;
  });

function displayQuotes(quotesArray) {
    quotelist.innerHTML = "";

  if (quotesArray.length === 0) {
    quotelist.innerHTML = "<li>No matching quotes found.</li>";
    return;
  }

  quotesArray.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.quote;
    quotelist.appendChild(li);
  });
}

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim(); // لازم تعرف searchTerm
    const searchWords = searchTerm.split(" ");
  
    const filtered = allQuotes.filter(q =>
      searchWords.every(word => q.quote.toLowerCase().includes(word))
    );
  
    displayQuotes(filtered);
  });
  
