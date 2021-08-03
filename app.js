// Requesting API data
const bugsUrl = "http://acnhapi.com/v1a/bugs";
const fishUrl = "http://acnhapi.com/v1a/fish";
const seaUrl = "http://acnhapi.com/v1a/sea";

const searchInput = document.querySelector(".search-form");
const searchBar = document.querySelector("#search-bar");

const resultContainer = document.querySelector(".result-container");

const getData = async (searchValue) => {
  try {
    const bugsData = await axios.get(bugsUrl);
    const fishData = await axios.get(fishUrl);
    const seaData = await axios.get(seaUrl);

    const listOfBugs = bugsData.data;
    const listOfFish = fishData.data;
    const listOfSea = seaData.data;

    // Merging all three datas into one data
    // It will be easier to display results without categorizing
    const totalList = listOfBugs.concat(listOfFish).concat(listOfSea);
    const filteredSearch = totalList.filter((critter) => {
      return critter.name["name-USen"].includes(searchValue);
    });

    console.log(filteredSearch);

    // Remove previous search before rendering new search
    removePrevious(resultContainer);

    //Rendering Results to HTML using DOM
    filteredSearch.forEach((result) => {
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
        months.innerHTML =
          '<i class="fas fa-calendar-alt"></i> Available All Year';
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
