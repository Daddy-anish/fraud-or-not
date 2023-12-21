const toggleButton = document.getElementById("toggleButton");
const messageDiv = document.getElementById("message");
const URLdiv = document.getElementById("URL");

toggleButton.addEventListener("change", function () {
  if (this.checked) {
    messageDiv.textContent = "on";
  } else {
    messageDiv.textContent = "off";
  }
});

// Query the current active tab in the current window
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     // Set the text content of the HTML element with ID 'URLdiv' to the URL of the active tab
//     URLdiv.textContent = tabs[0].url;
// });

toggleButton.addEventListener("change", function () {
  if (this.checked) {
    const urlInfo = window.location.href;
    URLdiv.textContent = urlInfo;
  }
});
