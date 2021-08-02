const timeInput = document.querySelector("#time");

// Creating time options

const timeSelect = document.querySelector("#time");

const time = () => {
  for (let i = 0; i <= 23; i++) {
    const timeOption = document.createElement("option");
    timeOption.textContent = `${i}:00`;
    timeOption.setAttribute("value", i);
    timeInput.append(timeOption);
  }
};

time();
