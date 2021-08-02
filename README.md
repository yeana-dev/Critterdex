![image](https://user-images.githubusercontent.com/78275456/127722888-911a0195-2b34-4c82-b970-65df31fd1a1e.png)

# Project Overview

## Critterdex - Animal Crossing New Horizon

## Project Description

Let users set their time, date, and hemisphere to see the list of bugs, fishes, and sea creatures that are available to catch. If user wants to find a specific critter, they can search by their name.

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

- Listing each type of critters by current (user's input) time, date, and hemisphere.
- Listing each critter with their name and icon.
- Search engine to look up critter by its name.

#### PostMVP

- Additional information for selected critter. (Detailed image, location, rarity, price, catch-phrase, and museum-phrase)
- Korean version.

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

| Day      | Deliverable                                                     | Status     |
| -------- | --------------------------------------------------------------- | ---------- |
| July 30  | Prompt / Wireframes / Priority Matrix / Timeframes              | Complete   |
| August 2 | Project Approval / Core Application Structure (HTML, CSS, etc.) | Incomplete |
| August 3 | Pseudocode / actual code                                        | Incomplete |
| August 4 | Initial Clickable Model                                         | Incomplete |
| August 5 | MVP                                                             | Incomplete |
| August 6 | Presentations                                                   | Incomplete |

## Priority Matrix

![image](https://user-images.githubusercontent.com/78275456/127721884-f6712904-61dc-4cd8-a766-8cce077e4bce.png)

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

Time frames are also key in the development cycle. You have limited time to code all phases of the game. Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component               | Priority | Estimated Time | Time Invested | Actual Time |
| ----------------------- | :------: | :------------: | :-----------: | :---------: |
| Pulling API             |    H     |      2hrs      |     0hrs      |    -hrs     |
| Structuring HTML & form |    H     |      4hrs      |     0hrs      |    -hrs     |
| Render user's input     |    H     |      5hrs      |     0hrs      |    -hrs     |
| Style using CSS/Flexbox |    H     |      5hrs      |     0hrs      |    -hrs     |
| Total                   |    H     |      -hrs      |     -hrs      |    -hrs     |

## Code Snippet

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
