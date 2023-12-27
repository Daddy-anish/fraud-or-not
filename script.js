const toggleButton = document.getElementById("toggleButton");
const messageDiv = document.getElementById("message");
const URLdiv = document.getElementById("URL");
const SSLdiv = document.getElementById("SSL");

toggleButton.addEventListener("change", function () {
  if (this.checked) {
    messageDiv.textContent = "on";

    // Query the current active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Set the text content of the HTML element with ID 'URLdiv' to the URL of the active tab
      const urlInfo = tabs[0].url;
      const hasSSL = urlInfo.startsWith("https://");
      URLdiv.textContent = urlInfo;
      SSLdiv.textContent = hasSSL
        ? "This site has an SSL certificate."
        : "This site does not have an SSL certificate.";
      
      // Call the function to detect hidden elements with the URL
      detectHiddenElements(urlInfo);
    });
  } else {
    messageDiv.textContent = "off";
  }
});

function detectHiddenElements(url) {
  fetch(url)
    .then((response) => response.text())
    .then((htmlContent) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      const allElements = doc.querySelectorAll("*");
      const hiddenElements = Array.from(allElements).filter((element) => {
        const style = getComputedStyle(element);
        return style && style.display === "none";
      });

      if (hiddenElements.length) {
        console.log("This page has hidden elements", hiddenElements);
      } else {
        console.log("This page has no hidden elements");
      }
    })
    .catch((error) => {
      console.log("Error fetching page", error);
    });
}
