document
  .getElementById("extract-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const url = document.getElementById("url-input").value;
    const resBox = document.getElementById("responseData")
    
    fetch(`http://localhost:3000/?url=${encodeURIComponent(url)}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("from python model", data.pythonOutput);
        // console.log("from puppeteer", data.texts);
        resBox.innerHTML = data.pythonOutput;
      })
      .catch((error) => console.error("Error:", error));
  });


