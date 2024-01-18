let listElement = document.querySelector("ul")
async function readTodos() {
    const response = await fetch("http://www.petrzela.eu/todo")
    if (response.ok === false) {
        console.log("invalid server response code: " + response.status)
        return
    } const listItems = await response.json()
    listElement.innerHTML = ""
    listItems.forEach((items) => {
        listElement.innerHTML += "<li>" + items.name + "</li>"
    })
}

readTodos()

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