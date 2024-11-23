const membersDiv = document.querySelector('#members');
const gridButton = document.querySelector('#gridButton');
const listButton = document.querySelector('#listButton');

async function fetchMemberData() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network failed to respond.');
        }
        const members = await response.json();

        members.forEach((member) => {
            if (!member.name || !member.image) return; // Skip empty or incomplete entries

            const memberDiv = document.createElement('div');
            memberDiv.classList.add('member-card');
            memberDiv.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">${member.website}</a>
                <figure>
                    <img src="${member.image}" alt="${member.name}" width="140" height="auto" >
                </figure>
            `;
            membersDiv.appendChild(memberDiv);
        });

        membersDiv.classList.add('grid'); // Set default layout class
    } catch (error) {
        console.error('Error: Problem with fetch', error);
    }
}

function activeButton(button) {
    gridButton.classList.remove('active');
    listButton.classList.remove('active');
    button.classList.add('active');
}

if (gridButton) {
    gridButton.addEventListener('click', () => {
        membersDiv.classList.add('grid');
        membersDiv.classList.remove('list');
        activeButton(gridButton);
    });
}

if (listButton) {
    listButton.addEventListener('click', () => {
        membersDiv.classList.add('list');
        membersDiv.classList.remove('grid');
        activeButton(listButton);
    });
}

fetchMemberData();