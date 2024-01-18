document
  .getElementById("extract-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const url = document.getElementById("url-input").value;
    document.getElementById("loader").style.display = "block";
    fetch(`http://localhost:3000/extract?url=${encodeURIComponent(url)}`)
      .then((response) => response.json())
      .then((data) => {
        const text = JSON.stringify(data.texts);
        document.getElementById("result").textContent = text;

        // Create a Blob instance representing the data as a text file
        const blob = new Blob([text], { type: "text/plain" });

        // Create a link element
        const downloadLink = document.createElement("a");

        // Set the download attribute with a filename
        downloadLink.download = "data.txt";

        // Create a URL for the Blob and set it as the href for the link
        downloadLink.href = URL.createObjectURL(blob);

        // Append the link to the document body and click it to start the download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up by removing the link element
        document.body.removeChild(downloadLink);
      })
      .catch((error) => console.error("Error:", error));
    document.getElementById("loader").style.display = "block";
  });

