let listElement = document.querySelector("ul")
async function readTodos() {
    const response = await fetch("http://www.petrzela.eu/todo")
    if (response.ok === false) {
        console.log("invalid server response code: " + response.status)
        return
    } const listItems = await response.json()
    listElement.innerHTML = ""
    listItems.forEach((items) => {
        listElement.insertAdjacentHTML("beforeend", "<li>" + items.name + "<button class='button' data-id='" + items.id + "'><img src='./delete_FILL0_wght400_GRAD0_opsz24.svg' alt='smazat'></button></li>")
        deleteButton = listElement.querySelector("button[data-id='" + items.id + "']")
        deleteButton.addEventListener("click", async (event) => {
            let button = event.currentTarget
            let id = button.getAttribute("data-id")
            deleteTodo(id)
        })
    })
}

async function deleteTodo(id) {
    const response = await fetch('http://www.petrzela.eu/todo/' + id,
        {
            method: 'DELETE',
        }
    )
    if (!response.ok) {
        console.log('Invalid server response code: ' + response.status)
        return
    }
    readTodos()
}

readTodos()

setInterval(() => {
    readTodos()
}, 1000)

async function createTodo(ukol) {
    const response = await fetch(
        'http://www.petrzela.eu/todo',
        {
            method: 'POST',
            body: JSON.stringify({
                name: ukol
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    )
    if (response.ok === false) {
        console.log("invalid server response code: " + response.status)
        return
    }
}

let form = document.querySelector(".create")
form.addEventListener("submit", async (event) => {
    console.log("ahoj")
    event.preventDefault()
    let ukol = form["ukol"].value
    await createTodo(ukol)
    await readTodos()
    form["ukol"].value = ""
})