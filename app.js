// Requesting API data
const bugsUrl = "http://acnhapi.com/v1a/bugs";
const fishUrl = "http://acnhapi.com/v1a/fish";
const seaUrl = "http://acnhapi.com/v1a/sea";

const searchInput = document.querySelector(".search-form-name");
const searchInput = document.querySelector(".search-form"); // search by time
const searchBar = document.querySelector("#search-bar");

const hemisphereInput = document.getElementsByName("hemisphere");
const northern = document.querySelector("#northern");
const southern = document.querySelector("#southern");
const timeInput = document.querySelector("#time");
const monthInput = document.querySelector("#month");

const resultContainer = document.querySelector(".result-container");
const critterDiv = document.querySelector(".critter-div");

// if user is searching by name -------------------------------------------------------
const getData = async (searchValue) => {
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
    //If no critters were found on search, no title.
    if (bugs[0] !== undefined) {
      resultTitleBug();
    }
    bugs.forEach((result) => {
      renderResults(result);
    });
    //If no critters were found on search, no title.
    if (fish[0] !== undefined) {
      resultTitleFish();
    }
    fish.forEach((result) => {
      renderResults(result);
    });
    //If no critters were found on search, no title.
    if (sea[0] !== undefined) {
      resultTitleSea();
    }
    sea.forEach((result) => {
      renderResults(result);
    });
  } catch (error) {
    console.error(error);
  }
};

searchInput.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchBar.value.length == 0) {
    // Stopping the function from re-rendering whole page with entire list of critters
    // when user click the submit button with empty input.
    return;
  }
  getData(searchBar.value);
});

function removePrevious(result) {
  while (result.lastChild) {
    result.removeChild(result.lastChild);
  }
}
// -----------------------------------------------------------------------------

// if user is searching by time
const getData = async (usersHemisphere) => {
  try {
    const bugsData = await axios.get(bugsUrl);
    const fishData = await axios.get(fishUrl);
    const seaData = await axios.get(seaUrl);

    const listOfBugs = bugsData.data;
    const listOfFish = fishData.data;
    const listOfSea = seaData.data;

    // Converting monthInput's and timeInput's value to number from string
    const usersMonth = parseInt(monthInput.value, 10);
    const usersTime = parseInt(timeInput.value, 10);

    // Pulling month array according to user's hemisphere input
    if (usersHemisphere === "northern") {
      removePrevious(resultDiv);
      // For northern hemisphere
      const bugsResult = listOfBugs.filter(
        (bug) =>
          bug["availability"]["month-array-northern"].includes(usersMonth) &&
          bug["availability"]["time-array"].includes(usersTime)
      );
      const fishResult = listOfFish.filter(
        (fish) =>
          fish["availability"]["month-array-northern"].includes(usersMonth) &&
          fish["availability"]["time-array"].includes(usersTime)
      );
      const seaResult = listOfSea.filter(
        (sea) =>
          sea["availability"]["month-array-northern"].includes(usersMonth) &&
          sea["availability"]["time-array"].includes(usersTime)
      );
      console.log(bugsResult);
      console.log(fishResult);
      console.log(seaResult);

      //Rendering results to HTML
      bugsResult.forEach((bugs) => {
        // Rendering each bug's icon
        const iconBug = document.createElement("img");
        iconBug.setAttribute("src", bugs.image_uri);
        resultDiv.append(iconBug);

        // Rendering each bug's name
        const nameBug = document.createElement("div");
        nameBug.classList.add("bug-name");
        nameBug.textContent = bugs.name["name-USen"];
        resultDiv.append(nameBug);

        // Rendering each bug's location
        const locationBug = document.createElement("div");
        locationBug.classList.add("bug-location");
        locationBug.textContent = bugs.availability.location;
        resultDiv.append(locationBug);

        // Rendering each bug's rarity
        const timeBug = document.createElement("div");
        timeBug.classList.add("bug-rarity");
        timeBug.textContent = bugs.availability.time;
        resultDiv.append(timeBug);
      });
    } else if (usersHemisphere === "southern") {
      // For southern hemisphere
      const filteredResult = listOfBugs.filter(
        (bug) =>
          bug["availability"]["month-array-southern"].includes(usersMonth) &&
          bug["availability"]["time-array"].includes(usersTime)
      );
      console.log(filteredResult);
    }
  } catch (error) {
    console.error(error);
  }
};
// -----------------------------------------------------------------------------

// DOM Rendering search result
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
  time.classList.add("time");

  // if the critter is available all day, print
  if (result.availability.isAllDay === true) {
    time.innerHTML = '<i class="far fa-clock"></i> Available all day';
  } else {
    // if not, print the time of availability
    time.innerHTML =
      '<i class="far fa-clock"></i>' +
      ` ${result.availability.time.toUpperCase()}`;
  }

  //location
  const location = document.createElement("li");
  location.classList.add("location");
  // Adding location icon
  location.innerHTML =
    '<i class="fas fa-map-pin"></i>' + ` ${result.availability.location}`;
  resultContent.append(location);

  resultContent.append(time);
}

//Result's title
function resultTitleBug() {
  const resultTitle = document.createElement("div");
  resultTitle.classList.add("result-title");
  resultTitle.innerHTML = '<i class="fas fa-bug"></i> Bugs';
  resultContainer.append(resultTitle);
}

function resultTitleFish() {
  const resultTitle = document.createElement("div");
  resultTitle.classList.add("result-title");
  resultTitle.innerHTML = '<i class="fas fa-fish"></i> Fish';
  resultContainer.append(resultTitle);
}

function resultTitleSea() {
  const resultTitle = document.createElement("div");
  resultTitle.classList.add("result-title");
  resultTitle.innerHTML = '<i class="fas fa-water"></i> Sea Creatures';
  resultContainer.append(resultTitle);
}

// Create time options
const time = () => {
  for (let i = 0; i <= 23; i++) {
    const timeOption = document.createElement("option");
    timeOption.textContent = `${i}:00`;
    timeOption.setAttribute("value", i);
    timeInput.append(timeOption);
  }
};

time();
