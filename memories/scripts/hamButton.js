
const hamButton = document.getElementById("menu");
const navigationList = document.querySelector("ul.navLinks");

hamButton.addEventListener("click", () => {
    navigationList.classList.toggle("open"); 
    hamButton.classList.toggle("open"); 
});