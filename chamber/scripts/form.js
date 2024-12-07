document.addEventListener("DOMContentLoaded", () => {
    const memberships = [
        {
            level: 'Non-Profit Membership',
            description: 'Ideal for non-profit organizations with no membership fee',
            price: 'FREE'
        },
        {
            level: 'Bronze Membership',
            description: 'Basic membership offering standard benefits for small businesses.',
            price: '500$'
        },
        {
            level: 'Silver Membership',
            description: 'Enhanced membership with additional networking opportunities.',
            price: '1000$'
        },
        {
            level: 'Gold Membership',
            description: 'Premium membership with exclusive perks and maximum visibility.',
            price: '2000$'
        }
    ];

    const membershipCards = document.querySelectorAll(".membership-card");
    const membershipInfo = document.getElementById("membership-info");

    // Check if the <dialog> element is supported
    if (typeof membershipInfo.showModal !== "function") {
        alert("Your browser does not support the <dialog> element.");
        return;
    }

    // Add event listeners to each "Learn More" button
    membershipCards.forEach((card, index) => {
        const button = card.querySelector(".membership-button");
        button.addEventListener("click", () => {
            displayMembershipDetails(memberships[index]);
        });
    });

    function displayMembershipDetails(membership) {
        // Populate the modal with membership details
        membershipInfo.innerHTML = `
            <button id="closeModal">❌</button>
            <h2>${membership.level}</h2>
            <p><strong>Description</strong>: ${membership.description}</p>
            <p><strong>Price per Year</strong>: ${membership.price}</p>
        `;
        membershipInfo.showModal(); // Show the modal dialog

        // Close button logic
        const closeModal = document.getElementById("closeModal");
        closeModal.addEventListener("click", () => {
            membershipInfo.close(); // Close the modal dialog
        });
    }
});
