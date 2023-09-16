const jokeContainer = document.getElementById("joke");
const jokeContainer2 = document.getElementById("jokeLine2");
const btn = document.getElementById("btn");
const nsfwBtn = document.getElementById("nsfw");
let url = "https://v2.jokeapi.dev/joke/Any";

let getJoke = () => {
  jokeContainer.classList.remove("fade");
  jokeContainer2.classList.remove("fade");
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      if (item.error) {
        throw new Error(item.error);
      }
      if (item.type == "single") {
        jokeContainer.textContent = `${item.joke}`;
        jokeContainer.classList.add("single");
        jokeContainer.classList.add("fade");
        jokeContainer2.classList.add("fade");
        jokeContainer2.textContent = "";
      } else if (item.type == "twopart") {
        jokeContainer.classList.remove("single");
        jokeContainer.classList.add("fade");
        jokeContainer2.classList.add("fade");
        jokeContainer.textContent = `Q: ${item.setup}`;
        jokeContainer2.textContent = `A: ${item.delivery}`;
      }
    })
    .catch((error) => {
      console.error("Error fetching joke:", error);
    });
};

let nsfwToggle = () => {
  // Toggle the text and class
  nsfwBtn.textContent = nsfwBtn.textContent.includes("ON")
    ? "NSFW: OFF"
    : "NSFW: ON";
  nsfwBtn.classList.toggle("off");

  // Check if NSFW filter is turned off and change request accordingly
  if (nsfwBtn.textContent.includes("OFF")) {
    url += "?blacklistFlags=nsfw";
  } else {
    url = url.replace("?blacklistFlags=nsfw", "");
  }
};

btn.addEventListener("click", getJoke);
nsfwBtn.addEventListener("click", nsfwToggle);
getJoke();
