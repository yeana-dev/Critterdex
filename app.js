// Requesting API data
const bugsUrl = "http://acnhapi.com/v1a/bugs";
const fishUrl = "http://acnhapi.com/v1a/fish";
const seaUrl = "http://acnhapi.com/v1a/sea";

const searchInput = document.querySelector(".search-form");
const searchBar = document.querySelector("#search-bar");

const resultDiv = document.querySelector(".results");

const getData = async (searchValue) => {
  try {
    const bugsData = await axios.get(bugsUrl);
    const fishData = await axios.get(fishUrl);
    const seaData = await axios.get(seaUrl);

    const listOfBugs = bugsData.data;
    const listOfFish = fishData.data;
    const listOfSea = seaData.data;

    // Merging all three datas into one data
    // It will be easier to display results without categoring
    const totalList = listOfBugs.concat(listOfFish).concat(listOfSea);
    const filteredSearch = totalList.filter((critter) => {
      return critter.name["name-USen"].includes(searchValue);
    });
    console.log(filteredSearch);

    //Rendering Results to HTML using DOM
    filteredSearch.forEach((result) => {
      //icon
      const icon = document.createElement("img");
      icon.setAttribute("src", result.icon_uri);
      resultDiv.append(icon);

      //name
      const name = document.createElement("div");
      name.textContent = result.name["name-USen"];
      resultDiv.append(name);

      //location
      const location = document.createElement("div");
      location.textContent = result.availability.location;
      resultDiv.append(location);

      //month
      const months = document.createElement("div");
      months.textContent = `North: ${result.availability["month-northern"]} / South : ${result.availability["month-southern"]}`;
      resultDiv.append(months);

      //time
      const time = document.createElement("div");
      time.textContent = result.availability.time;
      resultDiv.append(time);
    });
  } catch (error) {
    console.error(error);
  }
};

searchInput.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(searchBar.value);
  getData(searchBar.value);
});
