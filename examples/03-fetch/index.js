const fetchButton = document.querySelector("#fetchPeople");
const list = document.querySelector("#peoplelist");
const log = document.querySelector("#log");

fetchButton.addEventListener("click", () => {
  fetch("https://swapi.co/api/people/")
    .then(res => {
      console.log(res.ok, res.status, res);

      if (!res.ok) return Promise.reject(res.status);

      return res.json();
    })
    .then(json => {
      console.log(json);

      log.textContent = JSON.stringify(json, null, 2);

      json.results.forEach(person => {
        const listItem = document.createElement("li");
        listItem.textContent = person.name;

        list.appendChild(listItem);
      });
    })
    .catch(e => {
      alert(`WHOOPS: ${e}`);
    });
});
