const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  const location = search.value;
  e.preventDefault();

  messageOne.textContent = "Loading";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`).then(response => {
    console.log(response);
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});
