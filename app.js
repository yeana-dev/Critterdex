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

      //icon
      const icon = document.createElement("img");
      icon.classList.add("iconImg");
      icon.setAttribute("src", result.icon_uri);
      resultDiv.append(icon);

      // Making results as list
      const resultContent = document.createElement("ul");
      resultDiv.append(resultContent);

      //name
      const name = document.createElement("li");
      name.textContent = result.name["name-USen"];
      name.classList.add("name");
      resultContent.append(name);

      //location
      const location = document.createElement("li");
      location.textContent = result.availability.location;
      resultContent.append(location);

      //month
      const months = document.createElement("li");
      // if the critter is available all year, print
      if (result.availability.isAllYear === true) {
        months.textContent = "Available All Year";
      } else {
        // if not, print the months of availability, on each hemisphere
        months.textContent = `North: ${result.availability["month-northern"]} / South : ${result.availability["month-southern"]}`;
      }
      resultContent.append(months);

      //time
      const time = document.createElement("li");
      // if the critter is available all day, print
      if (result.availability.isAllDay === true) {
        time.textContent = "Available All Day";
      } else {
        // if not, print the time of availability
        time.textContent = result.availability.time.toUpperCase();
      }
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
