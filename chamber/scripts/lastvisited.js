function calculateDaysBetweenDates(lastVisitDate) {
    const currentDate = new Date();
    const lastVisit = new Date(lastVisitDate);
    const timeDiff = currentDate - lastVisit;
    const daysDifference = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysDifference;
}
if (localStorage.getItem("lastVisitDate")) {
    const lastVisitDate = localStorage.getItem("lastVisitDate");
    const daysSinceLastVisit = calculateDaysBetweenDates(lastVisitDate);

    let message;
    if (daysSinceLastVisit < 1) {
        message = "Back so soon! Awesome!";
    } else {
        const dayText = daysSinceLastVisit === 1 ? "day" : "days";
        message = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
    }

    document.getElementById("sidebarMessage").innerText = message;

} else {
    document.getElementById("sidebarMessage").innerText = "Welcome! Let us know if you have any questions.";
}

localStorage.setItem("lastVisitDate", new Date().toString());
