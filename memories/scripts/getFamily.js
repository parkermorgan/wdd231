async function fetchFamilyData() {

  const storedFamilyData = localStorage.getItem('familyData');
  
  if (storedFamilyData) {
   
    const familyData = JSON.parse(storedFamilyData);
    displayFamilyMembers(familyData);
    setupFilterButtons(familyData);
  } else {
  
    try {
      const response = await fetch('data/members.json');
      const familyData = await response.json();

      localStorage.setItem('familyData', JSON.stringify(familyData));

      displayFamilyMembers(familyData);
      setupFilterButtons(familyData);
    } catch (error) {
      console.error('Error fetching family data:', error);
    }
  }
}

function displayFamilyMembers(members) {
  const membersContainer = document.getElementById("members");
  membersContainer.innerHTML = ""; 

  members.forEach(member => {
    const memberDiv = document.createElement("div");
    memberDiv.className = "member-card";

    memberDiv.innerHTML = `
      <img src="${member.image}" alt="Photo of ${member.name}" loading="lazy">
      <h4>${member.name}</h4>
      <p>${member.town ? `${member.town}, ${member.state}` : "Location not provided"}</p>
      ${member.numberOfKids ? `<p>Kids: ${member.numberOfKids}</p>` : ""}
    `;
    memberDiv.addEventListener("click", () => displayMemberDetails(member));

    membersContainer.appendChild(memberDiv);
  });
}

async function fetchWeatherData(city, state) {
  const apiKey = 'deb344ac11393a9cb1c04cb7910804bb';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    const weatherData = await response.json();

    if (weatherData.cod === 200) {
      return {
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
      };
    } else {
      throw new Error("Weather data not found");
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}


async function displayMemberDetails(member) {
  const memberDetails = document.getElementById("memberDetails");
  
  const weather = await fetchWeatherData(member.town, member.state);


  const weatherInfo = weather 
    ? `<p><strong>Weather</strong>: ${weather.temperature}°F, ${weather.description}></p>`
    : `<p><strong>Weather</strong>: Information not available</p>`;

  memberDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${member.name}</h2>
    <p><strong>Town</strong>: ${member.town || "Not provided"}</p>
    <p><strong>State</strong>: ${member.state || "Not provided"}</p>
    ${member.numberOfKids ? `<p><strong>Number of Kids</strong>: ${member.numberOfKids}</p>` : ""}
    ${member.kidsNames?.length ? `<p><strong>Kids Names</strong>: ${member.kidsNames.join(", ")}</p>` : ""}
    <p><strong>Description</strong>: ${member.description || "No description provided"}</p>
    ${weatherInfo} <!-- Display the weather information here -->
  `;

  memberDetails.showModal();

  const closeModal = document.getElementById("closeModal");
  closeModal.addEventListener("click", () => {
    memberDetails.close(); 
  });
}

function filterFamily(criteria) {
  const familyData = JSON.parse(localStorage.getItem('familyData')); 

  let filteredMembers = familyData;
  if (criteria === "parents") {
    filteredMembers = familyData.filter(member => member.numberOfKids && parseInt(member.numberOfKids) > 0);
  } else if (criteria === "oldest") {
    filteredMembers = familyData.filter(member => member.ageGroup === "oldest");
  } else if (criteria === "youngest") {
    filteredMembers = familyData.filter(member => member.ageGroup === "youngest");
  }

  displayFamilyMembers(filteredMembers); 
}

function setupFilterButtons(members) {
  document.querySelectorAll(".family-buttons button").forEach(button => {
    button.addEventListener("click", () => {
      const criteria = button.textContent.toLowerCase();
      filterFamily(criteria === "all" ? "all" : criteria);
    });
  });
}

fetchFamilyData();
