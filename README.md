![image](https://user-images.githubusercontent.com/78275456/127722888-911a0195-2b34-4c82-b970-65df31fd1a1e.png)

# Project Overview

## Critterdex - Animal Crossing New Horizon

## [🍉 Deployed Web Site](https://yeana-dev.github.io/Critterdex-for-animal-crossing/)

## Project Description

Let users search critters by their name. List of results with critter's name, location, available time and month by each hemisphere.

## API and Data Sample

- Bugs API : [https://acnhapi.com/v1/bugs/](https://acnhapi.com/v1/bugs/)
- Fish API : [https://acnhapi.com/v1/fish/](https://acnhapi.com/v1/fish/)
- Sea Creature API : [http://acnhapi.com/v1/sea/](http://acnhapi.com/v1/sea/)

```
"peacock_butterfly": {
        "id": 4,
        "file-name": "peacock_butterfly",
        "name": {
            "name-USen": "peacock butterfly",
            "name-EUen": "peacock butterfly",
            "name-EUde": "Ritterfalter",
            "name-EUes": "mariposa bianor",
            "name-USes": "mariposa bianor",
            "name-EUfr": "papilio bianor",
            "name-USfr": "papilio bianor",
            "name-EUit": "farfalla vanessa io",
            "name-EUnl": "pauwenpage",
            "name-CNzh": "乌鸦凤蝶",
            "name-TWzh": "烏鴉鳳蝶",
            "name-JPja": "カラスアゲハ",
            "name-KRko": "제비나비",
            "name-EUru": "бианор"
        },
        "availability": {
            "month-northern": "3-6",
            "month-southern": "9-12",
            "time": "4am - 7pm",
            "isAllDay": false,
            "isAllYear": false,
            "location": "Flying near hybrid flowers",
            "rarity": "Uncommon",
            "month-array-northern": [
                3,
                4,
                5,
                6
            ],
            "month-array-southern": [
                9,
                10,
                11,
                12
            ],
            "time-array": [
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18
            ]
        },
        "price": 2500,
        "price-flick": 3750,
        "catch-phrase": "I caught a peacock butterfly! Now it's my turn to strut my stuff!",
        "museum-phrase": "Pretty as a peacock? Bah, I say! The wings of the peacock butterfly may have a pattern similar to that of the beautiful bird... But its forewings are also often covered in a dark, velvety hair! You heard right! HAIRY wings! A hair-raising revelation indeed!",
        "image_uri": "https://acnhapi.com/v1/images/bugs/4",
        "icon_uri": "https://acnhapi.com/v1/icons/bugs/4"
    },
```

## Wireframes

[Wireframe with mobile ver.1](https://whimsical.com/critterdex-XagNwLKhGWqb4QXmVxDGvr)

### MVP/PostMVP

#### MVP

- Listing each critter with their name, icon, available months, available time, and location.
- Text based search for critter
- Remove previous search

#### PostMVP

- Listing each type of critters by current (user's input) time, date, and hemisphere.
- Additional information for selected critter. (Detailed image, price, catch-phrase, and museum-phrase)
- Responsive Design. (Priority: Desktop; Secondary: Mobile)

## Project Schedule

| Day      | Deliverable                                                     | Status     |
| -------- | --------------------------------------------------------------- | ---------- |
| July 30  | Prompt / Wireframes / Priority Matrix / Timeframes              | Complete   |
| August 2 | Project Approval / Core Application Structure (HTML, CSS, etc.) | Complete   |
| August 3 | Pseudocode / actual code                                        | Complete   |
| August 4 | Initial Clickable Model                                         | Complete   |
| August 5 | MVP                                                             | Complete   |
| August 6 | Presentations                                                   | Incomplete |

## Priority Matrix

![image](https://user-images.githubusercontent.com/78275456/127721884-f6712904-61dc-4cd8-a766-8cce077e4bce.png)

## Timeframes

| Component                                     | Priority | Estimated Time | Time Invested | Actual Time |
| --------------------------------------------- | :------: | :------------: | :-----------: | :---------: |
| Set up API using axios                        |    H     |      3hrs      |     2hrs      |    2hrs     |
| Listing out all of the critters               |    H     |      3hrs      |     3hrs      |    3hrs     |
| Filter out the result by using critter's name |    H     |      5hrs      |     4hrs      |    4hrs     |
| List out each critter's information           |    H     |      6hrs      |     5hrs      |    5hrs     |
| Render results to HTML using DOM              |    H     |      6hrs      |     6hrs      |    6hrs     |
| Structuring HTML & form                       |    H     |      3hrs      |     3hrs      |    3hrs     |
| Style using CSS/Flexbox                       |    L     |      8hrs      |     8hrs      |    8hrs     |
| Total                                         |    H     |     34hrs      |     -hrs      |    31hrs    |

## Code Snippet

```
const getData = async (usersHemisphere) => {
  try {
    const bugsData = await axios.get(bugsUrl);
    const fishData = await axios.get(fishUrl);
    const seaData = await axios.get(seaUrl);

    // Converting monthInput's and timeInput's value to number from string
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
    //Rendering Results to HTML using DOM
    bugsHeader(bugs); // Show header of results if there is at least one result
    bugs.forEach((result) => renderResults(result));
      } catch (error) {
    console.error(error);
  }
};

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
```

## Change Log
