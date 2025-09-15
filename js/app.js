var editElements = $('.edit');
var pageId; // Unique identifier for the current HTML page

function generateUniqueId() {
  var currentPage = window.location.pathname.split("/").pop(); // Get the current page's filename
  pageId = currentPage.replace('.html', ''); // Use the filename as the page ID
  localStorage.setItem('pageId', pageId); // Save the identifier in localStorage
}

function myFunction() {
  if (pageId === 'software') {
    alert("This page is not editable.");
    return;
  }
  let pass = prompt("Please enter your password");
  if (pass == "000") {
    alert("Recommend edit content in Microsoft Word, then copy to website.\n • Big heading: font: Source Serif Pro, size: 37.5 \n • Small heading: font:Source Serif Pro, size 21. \n • Text: font:Calibri Light (Headings), size 12 \n\nAfter edit, click save and upload the downloaded file in ./js/json on github page ");
    editElements.attr('contentEditable', true);
    editElements.css('border', '1px solid blue');
  }
}

function mySave() {
  if (pageId === 'software') {
    alert("This page is not editable.");
    return;
  } // Skip saving on software.html

  var editedContents = [];

  editElements.each(function(index) {
    var editedContent = $(this).html();
    var key = 'newContent_' + pageId + '_' + (index + 1); // Include the pageId in the key
    localStorage.setItem(key, editedContent);

    // Auto-wrap any links
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var replacedContent = editedContent.replace(exp, function(match) {
      var link = '<u><a href="' + match + '" class="link">' + match + '</a></u>';
      var existingLinkCheck = '<u><a href="' + match + '" class="link">';
      if (editedContent.includes(existingLinkCheck)) {
        return match;
      } else {
        return link;
      }
    });

    editedContents.push(replacedContent);
  });

  // Save the array of contents as a JSON string
  var contentsJson = JSON.stringify(editedContents);
  var blob = new Blob([contentsJson], { type: 'application/json' });
  saveAs(blob, 'localStorageData_' + pageId + '.json'); // Include the pageId in the JSON file name

  editElements.attr('contenteditable', 'false');
  localStorage.removeItem('contentEditable');
  editElements.css('border', 'transparent');
}

function restoreContent() {
  if (pageId === 'software') return; // Skip restoring on software.html

  editElements.each(function(index) {
    var key = 'newContent_' + pageId + '_' + (index + 1);
    var savedContent = localStorage.getItem(key);
    if (savedContent) {
      $(this).html(savedContent);
    }
  });

  var importedData = localStorage.getItem('importedData');
  if (importedData) {
    var parsedData = JSON.parse(importedData);
    editElements.each(function(index) {
      $(this).html(parsedData[index]);
    });
  }
}

window.onload = () => {
  const anchors = document.querySelectorAll('a');
  const transition_el = document.querySelector('.transition');

  setTimeout(() => {
    generateUniqueId();

    if (pageId === 'software') {
      transition_el.classList.remove('is-active');
      return;
    }

    restoreContent();

    fetch('https://raw.githubusercontent.com/GuangyuWangLab/web/updated_web/js/json/localStorageData_' + pageId + '.json')
    // fetch('http://localhost:8000/js/json/localStorageData_' + pageId + '.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('JSON file not found');
        }
        return response.json();
      })
      .then(parsedData => {
        localStorage.setItem('importedData', JSON.stringify(parsedData));
        restoreContent();
        console.log('JSON file fetched and imported successfully.');
        transition_el.classList.remove('is-active');
      })
      .catch(error => {
        console.error('Error fetching JSON file:', error);
        var errorContainer = document.getElementById('error');
        if (errorContainer) {
          errorContainer.textContent = 'Error: JSON file not found.';
        }
      });
  }, 500);

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];
    anchor.addEventListener('click', e => {
      e.preventDefault();
      let target = e.target.href;
      transition_el.classList.add('is-active');
      setTimeout(() => {
        window.location.href = target;
      }, 500);
    });
  }
};
