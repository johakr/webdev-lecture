const fetchButton = document.querySelector("#fetchPeople");
const list = document.querySelector("#peoplelist");

fetchButton.addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/todos/")
    .then(res => {
      console.log(res.ok, res.status, res);

      if (!res.ok) return Promise.reject(res.status);

      return res.json();
    })
    .then(todos => {
      console.log(todos);

      todos.forEach(todo => {
        const listItem = document.createElement("li");
        listItem.textContent = todo.title;

        list.appendChild(listItem);
      });
    })
    .catch(e => {
      alert(`WHOOPS: ${e}`);
    });
});
