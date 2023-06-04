  var editElements = $('.edit');
  var pageId; // Unique identifier for the current HTML page
  
  function generateUniqueId() {
    var currentPage = window.location.pathname.split("/").pop(); // Get the current page's filename
    pageId = currentPage.replace('.html', ''); // Use the filename as the page ID
    localStorage.setItem('pageId', pageId); // Save the identifier in localStorage
  }

  function myFunction(){
    let pass = prompt("Please enter your password");
    if (pass == "000") {
      alert("Recommend edit content in Microsoft Word, then copy to website.\n • Big heading: font: Source Serif Pro, size: 37.5 \n • Small heading: font:Source Serif Pro, size 19. \n • Text: font:Calibri Light (Headings), size 12 \n\nAfter edit, click save and upload the downloaded file in ./js/json on github page")
      editElements.attr('contentEditable', true);
      editElements.css('border', '1px solid blue');
}
  }
  function mySave() {
    var editedContents = [];
  
    editElements.each(function(index) {
      var editedContent = $(this).html();
      var key = 'newContent_' + pageId + '_' + (index + 1); // Include the pageId in the key
      localStorage.setItem(key, editedContent);
      editedContents.push(editedContent);
    });
  
    // Save the array of contents as a JSON string
    var contentsJson = JSON.stringify(editedContents);
    var blob = new Blob([contentsJson], { type: 'application/json' });
    saveAs(blob, 'localStorageData_' + pageId + '.json'); // Include the pageId in the JSON file name
  
    // Disable editing for all elements
    editElements.attr('contenteditable', 'false');
    localStorage.removeItem('contentEditable'); // Remove the state from localStorage
    editElements.css('border', 'transparent');
  }
  
  function restoreContent() {
    editElements.each(function(index) {
      var key = 'newContent_' + pageId + '_' + (index + 1); // Include the pageId in the key
      var savedContent = localStorage.getItem(key);
      if (savedContent) {
        $(this).html(savedContent);
      }
    });
  
    // Retrieve the imported data from localStorage
    var importedData = localStorage.getItem('importedData');
    if (importedData) {
      var parsedData = JSON.parse(importedData);
      editElements.each(function(index) {
        $(this).html(parsedData[index]);
      });
    }
    
    // // Retrieve the state of contenteditable from localStorage
    // var contentEditable = localStorage.getItem('contentEditable');
    // if (contentEditable === 'true') {
    //   editElements.attr('contenteditable', 'true');
    // }
  }
  

window.onload = () => {
    const anchors = document.querySelectorAll('a');
    const transition_el = document.querySelector('.transition');
  
    setTimeout(() => {
      generateUniqueId(); // Generate a unique identifier for the page
      restoreContent();
      fetch('https://raw.githubusercontent.com/GuangyuWangLab/web/updated_web/js/json/localStorageData_' + pageId + '.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('JSON file not found');
        }
        return response.json();
      })
      .then(parsedData => {
        // Save the parsed data to localStorage
        localStorage.setItem('importedData', JSON.stringify(parsedData));
  
        // Restore content with the imported data
        restoreContent();
  
        // Display a success message or perform any other actions
        console.log('JSON file fetched and imported successfully.');
        transition_el.classList.remove('is-active');
      })
      .catch(error => {
        console.error('Error fetching JSON file:', error);
        // Display an error message or perform any other error handling
        var errorContainer = document.getElementById('error');
        errorContainer.textContent = 'Error: JSON file not found.';
      });
      
    }, 1000);
  
    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
  
      anchor.addEventListener('click', e => {
        e.preventDefault();
        let target = e.target.href;
  
        console.log(transition_el);
  
        transition_el.classList.add('is-active');
  
        console.log(transition_el);
  
        setInterval(() => {
          window.location.href = target;
        }, 1000);
      })
    }
  }
