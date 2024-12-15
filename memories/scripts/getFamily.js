// Fetch the family data from members.json
fetch('data/members.json')
  .then(response => response.json())
  .then(familyData => {
    displayFamilyMembers(familyData); // Display all family members on load
    setupFilterButtons(familyData); // Set up filter functionality
  })
  .catch(error => console.error('Error fetching family data:', error));

// Function to display family member cards
function displayFamilyMembers(members) {
  const membersContainer = document.getElementById("members");
  membersContainer.innerHTML = ""; // Clear previous members

  // Add family members to the container
  members.forEach(member => {
    const memberDiv = document.createElement("div");
    memberDiv.className = "member-card";

    memberDiv.innerHTML = `
      <img src="${member.image}" alt="Photo of ${member.name}" loading="lazy">
      <h4>${member.name}</h4>
      <p>${member.town ? `${member.town}, ${member.state}` : "Location not provided"}</p>
      ${member.numberOfKids ? `<p>Kids: ${member.numberOfKids}</p>` : ""}
    `;

    // Add click event to display member details in modal
    memberDiv.addEventListener("click", () => displayMemberDetails(member));

    membersContainer.appendChild(memberDiv);
  });
}

// Function to display detailed information in the modal
function displayMemberDetails(member) {
  const memberDetails = document.getElementById("memberDetails");
  memberDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${member.name}</h2>
    <p><strong>Town</strong>: ${member.town || "Not provided"}</p>
    <p><strong>State</strong>: ${member.state || "Not provided"}</p>
    ${member.numberOfKids ? `<p><strong>Number of Kids</strong>: ${member.numberOfKids}</p>` : ""}
    ${member.kidsNames?.length ? `<p><strong>Kids Names</strong>: ${member.kidsNames.join(", ")}</p>` : ""}
    <p><strong>Description</strong>: ${member.description || "No description provided"}</p>
  `;

  memberDetails.showModal(); // Open the modal

  const closeModal = document.getElementById("closeModal");
  closeModal.addEventListener("click", () => {
    memberDetails.close(); // Close the modal
  });
}

// Function to filter family members based on criteria
function filterFamily(criteria) {
  fetch('data/members.json')
    .then(response => response.json())
    .then(members => {
      let filteredMembers = members;
      if (criteria === "parents") {
        filteredMembers = members.filter(member => member.numberOfKids && parseInt(member.numberOfKids) > 0);
      } else if (criteria === "oldest") {
        filteredMembers = members.filter(member => member.ageGroup === "oldest");
      } else if (criteria === "youngest") {
        filteredMembers = members.filter(member => member.ageGroup === "youngest");
      }
      displayFamilyMembers(filteredMembers); // Display filtered members
    })
    .catch(error => console.error('Error filtering family members:', error));
}

// Set up filter buttons
function setupFilterButtons(members) {
  document.querySelectorAll(".family-buttons button").forEach(button => {
    button.addEventListener("click", () => {
      const criteria = button.textContent.toLowerCase();
      filterFamily(criteria === "all" ? "all" : criteria);
    });
  });
}
