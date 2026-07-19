


const form = document.getElementById("search-form");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const input = document.getElementById("word-input");
  const resultsDiv = document.getElementById("results"); 
  const word = input.value.trim();
  if (word === "") return;

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      resultsDiv.innerHTML = `<p>Word not found. Please check your spelling and try again.</p>`;
      return;
    }

    const data = await response.json();
    const entry = data[0];

    const phoneticEntry = entry.phonetics.find(function(p) {
      return p.audio !== "";
    });

    let phoneticHTML = "";
    if (phoneticEntry) {
      phoneticHTML = `<p>${phoneticEntry.text || ""} 
        <button type="button" onclick="new Audio('${phoneticEntry.audio}').play()">🔊 Play</button>
      </p>`;
    }

    let meaningsHTML = "";
    entry.meanings.forEach(function(meaning) {
      meaningsHTML += `<h3>${meaning.partOfSpeech}</h3>`;

      if (meaning.synonyms.length === 0) {
        meaningsHTML += `<p><em>No synonyms available</em></p>`;
      } else {
        meaningsHTML += `<p>Synonyms: ${meaning.synonyms.join(", ")}</p>`;
      }

      meaning.definitions.forEach(function(def) {
        meaningsHTML += `<p>${def.definition}</p>`;
      });
    });

    resultsDiv.innerHTML = `<h2>${entry.word}</h2>` + phoneticHTML + meaningsHTML;

  } catch (error) {
    resultsDiv.innerHTML = `<p>Something went wrong. Please try again.</p>`;
    console.log("Error:", error);
  }
});



































































