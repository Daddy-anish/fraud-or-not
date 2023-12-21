const toggleButton = document.getElementById("toggleButton");
const togglePopup = document.getElementById("togglePopup");
const toggleState = document.getElementById("toggleState");
const closeButton = document.getElementById("closeButton");

toggleButton.addEventListener("change", function () {
  if (this.checked) {
    toggleState.textContent = "The toggle is switched on.";
    togglePopup.showModal();
  } else {
    toggleState.textContent = "The toggle is switched off.";
  }
});

closeButton.addEventListener("click", function () {
  togglePopup.close();
});
