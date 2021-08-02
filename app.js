// Requesting API data
const bugsUrl = "http://acnhapi.com/v1a/bugs";
const fishUrl = "http://acnhapi.com/v1a/fish";
const seaUrl = "http://acnhapi.com/v1a/sea";

const searchInput = document.querySelector(".search-form");
const searchBar = document.querySelector("#search-bar");

const getData = async (searchValue) => {
  try {
    const bugsData = await axios.get(bugsUrl);
    const fishData = await axios.get(fishUrl);
    const seaData = await axios.get(seaUrl);

    const listOfBugs = bugsData.data;
    const listOfFish = fishData.data;
    const listOfSea = seaData.data;

    const totalList = listOfBugs.concat(listOfFish).concat(listOfSea);
    console.log(totalList);
  } catch (error) {
    console.error(error);
  }
};

searchInput.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(searchBar.value);
});
