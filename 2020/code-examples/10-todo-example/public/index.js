const fetchButton = document.querySelector("#fetchTodos");
const list = document.querySelector("#todoList");
const createForm = document.querySelector("#create-todo");

createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const values = Object.fromEntries(new FormData(e.target));

  fetch("/todos", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => {
    console.log(res.ok);
  });

  console.log("FORM SUBMITTED", values);
});

fetchButton.addEventListener("click", () => {
  fetch("/todos?author=johannes")
    .then((res) => {
      // console.log(res.ok, res.status, res);

      if (!res.ok) return Promise.reject(res.status);

      return res.json();
    })
    .then((todos) => {
      // console.log(todos);

      todos.forEach((todo) => {
        const listItem = document.createElement("li");
        listItem.textContent = todo.title;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE TODO";

        deleteButton.addEventListener("click", () => {
          fetch(`/todos/${todo.id}`, {
            method: "DELETE",
          }).then((res) => {
            if (res.ok) {
              listItem.remove();
            }
          });
        });

        listItem.append(deleteButton);

        list.appendChild(listItem);
      });
    })
    .catch((e) => {
      alert(`WHOOPS: ${e}`);
    });
});
