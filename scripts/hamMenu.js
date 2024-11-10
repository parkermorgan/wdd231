const hamButton = document.getElementById("menu");
const navigationList = document.querySelector("ul.navigation");

hamButton.addEventListener("click", () => {
    navigationList.classList.toggle("open");
    menuButton.classList.toggle("open"); // Toggles icon between ☰ and ❎
  });