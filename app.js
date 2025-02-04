// Requesting API data
const bugsUrl = "https://acnhapi.com/v1a/bugs";
const fishUrl = "https://acnhapi.com/v1a/fish";
const seaUrl = "https://acnhapi.com/v1a/sea";

const searchInput = document.querySelector(".search-form"); // search form by time
const searchInputName = document.querySelector(".search-form-name"); // search form by name
const searchBar = document.querySelector("#search-bar"); // search bar by name

const viewAllButton = document.querySelector(".view-all");
const viewBug = document.querySelector("#view-bug");
const viewFish = document.querySelector("#view-fish");
const viewSea = document.querySelector("#view-sea");

const hemisphereInput = document.getElementsByName("hemisphere");
const northern = document.querySelector("#northern");
const southern = document.querySelector("#southern");
const timeInput = document.querySelector("#time");
const monthInput = document.querySelector("#month");

const resultContainer = document.querySelector(".result-container");
const critterDiv = document.querySelector(".critter-div");

// Event listeners ---------------------------------------------------------------------
searchInputName.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchBar.value.length == 0) return;
  // Stopping the function from re-rendering whole page with entire list of critters
  // when user click the submit button with empty input.
  getDataName(searchBar.value);
});

searchInput.addEventListener("submit", (e) => {
  e.preventDefault();
  // Two separate parameter for hemisphere
  if (northern.checked === true) {
    let usersHemisphere = "northern";
    getData(usersHemisphere); // Send the user's input to axios
    return usersHemisphere;
  } else if (southern.checked === true) {
    let usersHemisphere = "southern";
    getData(usersHemisphere); // Send the user's input to axios
    return usersHemisphere;
  } else {
    // Informing user to choose their input
    alert("Pick your hemisphere please");
  }
});

viewAllButton.addEventListener("click", (e) => {
  e.preventDefault();
  viewAll("all");
});

viewBug.addEventListener("click", (e) => {
  e.preventDefault();
  viewAll("bug");
});

viewFish.addEventListener("click", (e) => {
  e.preventDefault();
  viewAll("fish");
});

viewSea.addEventListener("click", (e) => {
  e.preventDefault();
  viewAll("sea");
});

// Clicking view all button ------------------------------------------------------
const viewAll = async (critter) => {
  try {
    const bugsData = await axios.get(bugsUrl);
    const fishData = await axios.get(fishUrl);
    const seaData = await axios.get(seaUrl);

    removePrevious(resultContainer);

    function showBug() {
      bugsHeader(bugsData.data);
      for (let i = 0; i < bugsData.data.length; i++) {
        renderResults(bugsData.data[i]);
      }
    }

    function showFish() {
      fishHeader(fishData.data);
      for (let i = 0; i < fishData.data.length; i++) {
        renderResults(fishData.data[i]);
      }
    }
    function showSea() {
      seaHeader(seaData.data);
      for (let i = 0; i < seaData.data.length; i++) {
        renderResults(seaData.data[i]);
      }
    }

    if (critter === "bug") {
      showBug();
    } else if (critter === "fish") {
      showFish();
    } else if (critter === "sea") {
      showSea();
    } else {
      showBug();
      showFish();
      showSea();
    }
  } catch (error) {
    console.error(error);
  }
};

// if user is searching by name -------------------------------------------------------
const getDataName = async (searchValue) => {
  try {
    const bugsData = await axios.get(bugsUrl);
    const fishData = await axios.get(fishUrl);
    const seaData = await axios.get(seaUrl);

    const bugs = bugsData.data.filter((critter) => {
      return critter.name["name-USen"].includes(searchValue);
    });
    const fish = fishData.data.filter((critter) => {
      return critter.name["name-USen"].includes(searchValue);
    });
    const sea = seaData.data.filter((critter) => {
      return critter.name["name-USen"].includes(searchValue);
    });

    // Remove previous search before rendering new search
    removePrevious(resultContainer);

    //Rendering Results to HTML using DOM
    bugsHeader(bugs); // Show header of results if there is at least one result
    bugs.forEach((result) => renderResults(result));

    fishHeader(fish); // Show header of results if there is at least one result
    fish.forEach((result) => renderResults(result));

    seaHeader(sea); // Show header of results if there is at least one result
    sea.forEach((result) => renderResults(result));
  } catch (error) {
    console.error(error);
  }
};

// if user is searching by time
const getData = async (usersHemisphere) => {
  try {
    const bugsData = await axios.get(bugsUrl);
    const fishData = await axios.get(fishUrl);
    const seaData = await axios.get(seaUrl);

    // Converting monthInput's and timeInput's value to integer from string
    const usersMonth = parseInt(monthInput.value, 10);
    const usersTime = parseInt(timeInput.value, 10);

    removePrevious(resultContainer);
    // filter out the results by available months (on user's input hemisphere) and time
    const bugs = bugsData.data.filter(
      (bug) =>
        bug["availability"][`month-array-${usersHemisphere}`].includes(
          usersMonth
        ) && bug["availability"]["time-array"].includes(usersTime)
    );
    const fish = fishData.data.filter(
      (fish) =>
        fish["availability"][`month-array-${usersHemisphere}`].includes(
          usersMonth
        ) && fish["availability"]["time-array"].includes(usersTime)
    );
    const sea = seaData.data.filter(
      (sea) =>
        sea["availability"][`month-array-${usersHemisphere}`].includes(
          usersMonth
        ) && sea["availability"]["time-array"].includes(usersTime)
    );

    // Remove previous search before rendering new search
    removePrevious(resultContainer);

    //Rendering Results to HTML using DOM
    bugsHeader(bugs); // Show header of results if there is at least one result
    bugs.forEach((result) => renderResults(result));
    fishHeader(fish); // Show header of results if there is at least one result
    fish.forEach((result) => renderResults(result));
    seaHeader(sea); // Show header of results if there is at least one result
    sea.forEach((result) => renderResults(result));
  } catch (error) {
    console.error(error);
  }
};

// DOM Rendering search result ↓
function renderResults(result) {
  // Making an individual div for each result
  const resultDiv = document.createElement("div");
  resultDiv.classList.add("resultDiv");
  resultContainer.append(resultDiv);
  // icon
  const icon = document.createElement("img");
  icon.classList.add("iconImg");
  icon.setAttribute("src", result.icon_uri);
  resultDiv.append(icon);
  // Making separate container for right side content(name,year,location,time)
  const rightDiv = document.createElement("div");
  rightDiv.classList.add("right-div");
  resultDiv.append(rightDiv);
  //name
  const name = document.createElement("div");
  name.classList.add("name");
  name.textContent = result.name["name-USen"];
  rightDiv.append(name);
  //price
  const price = document.createElement("div");
  price.classList.add("price");
  price.innerHTML = `${result.price} bell`;
  name.append(price);
  // Wrapping year, location, time into a list
  const resultContent = document.createElement("ul");
  rightDiv.append(resultContent);
  // month
  const months = document.createElement("li");
  months.classList.add("months");
  // if the critter is available all year, print
  if (result.availability.isAllYear === true) {
    months.innerHTML = '<i class="fas fa-calendar-alt"></i> Available All Year';
  } else {
    // if not, print the months of availability, on each hemisphere
    months.innerHTML =
      '<i class="fas fa-calendar-alt"></i>' +
      ` North: ${result.availability["month-northern"]} | South : ${result.availability["month-southern"]}`;
  }
  resultContent.append(months);

  //time
  const time = document.createElement("li");
  time.classList.add("time"); // if the critter is available all day, print
  if (result.availability.isAllDay === true) {
    time.innerHTML = '<i class="far fa-clock"></i> Available all day';
  } else {
    // if not, print the time of availability
    time.innerHTML = `<i class="far fa-clock"></i> ${result.availability.time.toUpperCase()}`;
  }

  //location
  if (result.availability.hasOwnProperty("location") == true) {
    const location = document.createElement("li");
    location.classList.add("location");
    location.innerHTML =
      // Adding location icon
      `<i class="fas fa-map-pin"></i> ${result.availability.location}`;
    resultContent.append(location);
  } else return;

  resultContent.append(time);
}

//Check if there's a result ↓
function bugsHeader(bugs) {
  if (bugs[0] !== undefined) {
    const resultTitle = document.createElement("div");
    resultTitle.classList.add("result-title");
    resultTitle.innerHTML = '<i class="fas fa-bug"></i> Bugs';
    resultContainer.append(resultTitle);
  }
}
function fishHeader(fish) {
  if (fish[0] !== undefined) {
    const resultTitle = document.createElement("div");
    resultTitle.classList.add("result-title");
    resultTitle.innerHTML = '<i class="fas fa-fish"></i> Fish';
    resultContainer.append(resultTitle);
  }
}
function seaHeader(sea) {
  if (sea[0] !== undefined) {
    const resultTitle = document.createElement("div");
    resultTitle.classList.add("result-title");
    resultTitle.innerHTML = '<i class="fas fa-water"></i> Sea Creatures';
    resultContainer.append(resultTitle);
  }
}

//Removing last search result
function removePrevious(result) {
  while (result.lastChild) {
    result.removeChild(result.lastChild);
  }
}

// Create time options
const time = () => {
  for (let i = 0; i <= 23; i++) {
    const timeOption = document.createElement("option");
    if (i <= 11) {
      timeOption.textContent = `${i}:00 AM`;
    } else if (i === 12) {
      timeOption.textContent = `12:00 PM`;
    } else {
      timeOption.textContent = `${i - 12}:00 PM`;
    }
    timeOption.setAttribute("value", i);
    timeInput.append(timeOption);
  }
};

time();
