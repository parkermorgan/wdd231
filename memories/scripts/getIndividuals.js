async function fetchIndividualData() {
    const storedIndividualData = localStorage.getItem('individualData');
    
    if (storedIndividualData) {
      const individualData = JSON.parse(storedIndividualData);
      displayIndividuals(individualData);
      setupFilterButtons(individualData);
    } else {
      try {
        const response = await fetch('data/individuals.json'); // Correct path to your json file
        const individualData = await response.json();
    
        localStorage.setItem('individualData', JSON.stringify(individualData));
    
        displayIndividuals(individualData);
        setupFilterButtons(individualData);
      } catch (error) {
        console.error('Error fetching individual data:', error);
      }
    }
  }
  
  function displayIndividuals(individuals) {
    const individualsContainer = document.getElementById("individuals");
    individualsContainer.innerHTML = "";
  
    individuals.forEach(individual => {
      const individualDiv = document.createElement("div");
      individualDiv.className = "individual-card";
  
      individualDiv.innerHTML = `
        <img src="${individual.image}" alt="Photo of ${individual.name}" width="400" height="400">
        <h2>${individual.name}</h2>
        ${individual.spouse ? `<p><strong>Spouse</strong>: ${individual.spouse}</p>` : ""}
        <p><strong>Date of Birth</strong>: ${individual.dob}</p>
        ${individual.numberOfKids ? `<p><strong>Number of Kids</strong>: ${individual.numberOfKids}</p>` : ""}
        `;
      individualDiv.addEventListener("click", () => displayIndividualDetails(individual));
  
      individualsContainer.appendChild(individualDiv);
    });
  }
  
  function displayIndividualDetails(individual) {
    const individualDetails = document.getElementById("individualDetails");
    
    individualDetails.innerHTML = `
      <h2>${individual.name}</h2>
      <p><strong>Spouse</strong>: ${individual.spouse || "Not provided"}</p>
      <p><strong>Date of Birth</strong>: ${individual.dob}</p>
      <p><strong>Gender</strong>: ${individual.gender === 'm' ? 'Male' : 'Female'}</p>
      ${individual.numberOfKids ? `<p><strong>Number of Kids</strong>: ${individual.numberOfKids}</p>` : ""}
      ${individual.kidsNames?.length ? `<p><strong>Kids Names</strong>: ${individual.kidsNames.join(", ")}</p>` : ""}
      <p><strong>Description</strong>: ${individual.description || "No description provided"}</p>
    `;
  }
  
  function filterIndividuals(criteria) {
    const individualData = JSON.parse(localStorage.getItem('individualData'));
  
    let filteredIndividuals = individualData;
  
    if (criteria === "parents") {
      filteredIndividuals = individualData.filter(individual => individual.numberOfKids && parseInt(individual.numberOfKids) > 0);
    } else if (criteria === "kids") {
      filteredIndividuals = individualData.filter(individual => individual.ageGroup === "kid");
    } else if (criteria === "grandkids") {
      filteredIndividuals = individualData.filter(individual => individual.ageGroup === "grandkid");
    } else if (criteria === "male") {
      filteredIndividuals = individualData.filter(individual => individual.gender === "m");
    } else if (criteria === "female") {
      filteredIndividuals = individualData.filter(individual => individual.gender === "f");
    }
  
    displayIndividuals(filteredIndividuals);
  }
  
  function setupFilterButtons(individuals) {
    document.querySelectorAll(".family-buttons button").forEach(button => {
      button.addEventListener("click", () => {
        const criteria = button.textContent.toLowerCase();
        filterIndividuals(criteria === "all" ? "all" : criteria);
      });
    });
  }
  
  fetchIndividualData();
  