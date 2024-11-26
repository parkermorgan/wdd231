async function displayThreeRandomMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network failed to respond.');
        }
        const members = await response.json();

        // Randomly select 3 unique members
        const selectedMembers = [];
        while (selectedMembers.length < 3) {
            const randomIndex = Math.floor(Math.random() * members.length);
            const member = members[randomIndex];
            if (!selectedMembers.includes(member)) {
                selectedMembers.push(member);
            }
        }

        // Target the existing #random-members div
        const randomMembersDiv = document.querySelector('#random-members');
        randomMembersDiv.innerHTML = ''; // Clear existing content if any
        randomMembersDiv.classList.add('random-members'); // Optional: Add a class for styling

        // Render the 3 selected members
        selectedMembers.forEach((member) => {
            if (!member.name || !member.image) return; // Skip empty or incomplete entries

            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            memberCard.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">${member.website}</a>
                <figure>
                    <img src="${member.image}" alt="${member.name}" width="140" height="auto">
                </figure>
                <p>${member.description}</p>
            `;
            randomMembersDiv.appendChild(memberCard);
        });
    } catch (error) {
        console.error('Error: Problem with fetching random members', error);
    }
}

// Call the new function
displayThreeRandomMembers();
