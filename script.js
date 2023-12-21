const toggleButton = document.getElementById("toggleButton");
const messageDiv = document.getElementById("message");
const URLdiv = document.getElementById("URL");
const SSLdiv = document.getElementById("SSL");

toggleButton.addEventListener("change", function () {
  if (this.checked) {
    messageDiv.textContent = "on";
  } else {
    messageDiv.textContent = "off";
  }
});

toggleButton.addEventListener("change", function () {
  if (this.checked) {
    // Query the current active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Set the text content of the HTML element with ID 'URLdiv' to the URL of the active tab
      const urlInfo = tabs[0].url;
      const hasSSL = urlInfo.startsWith("https://");
      URLdiv.textContent = urlInfo;
      SSLdiv.textContent = hasSSL
        ? "This site has an SSL certificate."
        : "This site does not have an SSL certificate.";
    });
  }
});
