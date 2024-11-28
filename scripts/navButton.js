// Toggle function for mobile view
function toggleNav() {
    const navlinks = document.querySelector('.navLinks');
    navlinks.classList.toggle('open'); // Toggle the "open" class to show/hide nav links
  }
  
  // Detect screen size and only apply toggle for mobile
  const menuButton = document.getElementById("menu");
  const navLinks = document.querySelector(".navLinks");
  
  // Initially ensure nav links are shown on desktop and hidden on mobile
  if (window.innerWidth >= 900) {
    navLinks.classList.add("open"); // Show nav links automatically on desktop
  } else {
    navLinks.classList.remove("open"); // Ensure nav links are hidden on mobile
  }
  
  // Ensure the toggle button functionality works only on mobile
  menuButton.addEventListener("click", () => {
    if (window.innerWidth < 900) {
      toggleNav();
    }
  });
  
  // Optionally, if the window resizes dynamically (i.e., desktop/mobile switch), we can re-apply logic:
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) {
      navLinks.classList.add("open"); // Show nav links automatically on desktop
    } else {
      navLinks.classList.remove("open"); // Hide nav links on mobile
    }
  });