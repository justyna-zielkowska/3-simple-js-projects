const div = document.querySelector("#root");

const element = document.createElement("textarea");
element.classList.add = "textarea";
element.setAttribute(
  "style",
  "border-color: black; border-width: 2px, border-style: solid; padding: 10px; margin: 10px"
);
element.placeholder = "Write sth...";

div.appendChild(element);

//tworzę listę nienumerowaną notatek
const list = document.createElement("ul");
list.classList.add = "list";
list.innerText = "";

div.appendChild(list);

const button = document.createElement("button");
button.innerHTML = "Save";

div.appendChild(button);

//dodaję clicka na buttonie

button.addEventListener("click", function () {
  if (element.value.length > 0) {
    const newEl = document.createElement("li");
    list.appendChild(newEl);
    newEl.setAttribute(
      "style",
      "list-style-type: none; display: flex; justify-content: space-between; border-color: black; border-style: solid; border-width: 1px; padding: 10px; margin: 16px"
    );
    newEl.innerText = element.value;
    element.value = "";

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    newEl.appendChild(editButton);

    editButton.addEventListener("click", function () {
      localStorage.setItem("newEl", newEl.innerText); //poprawic zeby nie dodawały sie buttony
      if (localStorage.getItem("newEl") !== 0) {
        element.value = localStorage.getItem("newEl");
        localStorage.removeItem("newEl");
        list.removeChild(newEl);
      }
    });

    const clearButton = document.createElement("button");
    clearButton.innerText = "Delete";
    newEl.appendChild(clearButton);
    clearButton.addEventListener("click", function () {
      list.removeChild(newEl);
    });
  }
});
