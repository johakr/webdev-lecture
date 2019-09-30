const fetchButton = document.querySelector("#fetchTodos");
const list = document.querySelector("#todoList");

fetchButton.addEventListener("click", () => {
  fetch("/api/todos")
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
