// gallery.js — filter controls for the kit gallery (index.html)
// Plain JavaScript, no libraries. Runs after the page is parsed (defer).

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. Grab the kit cards and the two containers we write into ──────────────

  // Every <div class="kit"> on the page is one card.
  var cards = Array.from(document.querySelectorAll('.kit'));

  // The empty <div id="filters"> where we'll inject the buttons.
  var filterBar = document.getElementById('filters');

  // The <p id="kit-count"> where we'll write "Showing X of Y kits."
  var countLine = document.getElementById('kit-count');

  // If neither container exists there's nothing to do.
  if (!filterBar || !countLine) return;


  // ── 2. Collect every unique cue ID and difficulty value from the cards ──────

  var cueSet = new Set();
  var diffSet = new Set();

  cards.forEach(function (card) {
    // data-cues holds a space-separated list of indicator IDs, e.g.
    // "SENDER-LOOKALIKE LINK-MISMATCH FAKE-SUPPORT-NUMBER"
    var cues = card.dataset.cues ? card.dataset.cues.split(' ') : [];
    cues.forEach(function (cue) {
      if (cue) cueSet.add(cue);
    });

    // data-difficulty holds "1", "2", or "3".
    if (card.dataset.difficulty) diffSet.add(card.dataset.difficulty);
  });


  // ── 3. Helper: turn "SENDER-LOOKALIKE" into "Sender Lookalike" ─────────────

  function formatCueId(id) {
    return id.split('-').map(function (word) {
      // Capitalise the first letter; lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }


  // ── 4. Helper: build a single <button> element ─────────────────────────────

  function makeButton(label, filterType, filterValue) {
    var btn = document.createElement('button');
    btn.type = 'button';          // prevents accidental form submission
    btn.className = 'filter-btn';
    btn.textContent = label;

    // Store what this button filters on so the click handler can read it.
    btn.dataset.filterType  = filterType;   // "all" | "difficulty" | "cue"
    btn.dataset.filterValue = filterValue;  // "all" | "1"/"2"/"3" | cue ID

    return btn;
  }


  // ── 5. Create and append all the buttons ───────────────────────────────────

  // "All" resets the view.
  var allBtn = makeButton('All', 'all', 'all');
  allBtn.classList.add('active'); // start with All highlighted
  filterBar.appendChild(allBtn);

  // One button per difficulty level, sorted numerically.
  Array.from(diffSet).sort().forEach(function (diff) {
    filterBar.appendChild(makeButton('Difficulty ' + diff, 'difficulty', diff));
  });

  // One button per unique cue ID, sorted alphabetically.
  Array.from(cueSet).sort().forEach(function (cue) {
    filterBar.appendChild(makeButton(formatCueId(cue), 'cue', cue));
  });


  // ── 6. Count helper — writes "Showing X of Y kits." ────────────────────────

  function updateCount(visibleCount) {
    countLine.textContent =
      'Showing ' + visibleCount + ' of ' + cards.length + ' kit' +
      (cards.length === 1 ? '' : 's') + '.';
  }

  // Show the initial count now that JS is running.
  updateCount(cards.length);


  // ── 7. Filter logic — show/hide cards based on the active button ────────────

  function applyFilter(filterType, filterValue) {
    var shown = 0;

    cards.forEach(function (card) {
      var match = false;

      if (filterType === 'all') {
        // "All" always matches.
        match = true;

      } else if (filterType === 'difficulty') {
        // Match if the card's difficulty equals the chosen value.
        match = (card.dataset.difficulty === filterValue);

      } else if (filterType === 'cue') {
        // Match if the card's cue list contains the chosen cue ID.
        var cues = card.dataset.cues ? card.dataset.cues.split(' ') : [];
        match = cues.indexOf(filterValue) !== -1;
      }

      // Show or hide the card; empty string restores the element's default display.
      card.style.display = match ? '' : 'none';
      if (match) shown++;
    });

    updateCount(shown);
  }


  // ── 8. Click handler on the filter bar (one listener, not one per button) ───

  filterBar.addEventListener('click', function (e) {
    // Find the button that was clicked (handles clicks on child elements too).
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Move the "active" highlight to the clicked button.
    filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    // Run the filter.
    applyFilter(btn.dataset.filterType, btn.dataset.filterValue);
  });

});
