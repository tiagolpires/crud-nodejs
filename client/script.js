const createForm = document.querySelector(".create-form")
const createTitle = document.querySelector("#create-title")
const divContainer = document.querySelector(".cards-container")
const closeButton = document.querySelector(".close-button")
const modal = document.querySelector(".modal")
const modalEditButton = document.querySelector(".edit-button")
const editInput = document.querySelector("#edit-input")

createForm.addEventListener("submit", saveItem)
closeButton.addEventListener("click", closeModal)
modalEditButton.addEventListener("click", editItem)

renderItems()


async function renderItems(){
    const req = await fetch("http://localhost:3001/api/items")
    const data = await req.json() 
    data.map((item) => {
        createItem(item.title, item._id)
    })
}

async function saveItem(event){
    event.preventDefault()
    
    const title = createTitle.value
    await fetch("http://localhost:3001/api/items", {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
        })
    })
    createTitle.value = ''

    refreshItems()
}

async function editItem(event){
    event.preventDefault()
    const newTitle = editInput.value
    const editId = modal.getAttribute('id')

    await fetch("http://localhost:3001/api/items/"+ editId, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: newTitle,
        })
    })

    closeModal()
    refreshItems()
    editInput.value = ""
}

async function deleteItem(id){
    await fetch("http://localhost:3001/api/items/"+ id, {
        method:'DELETE',
    })
    refreshItems()
}

function createItem(title, id){
    const divCard = document.createElement('div')
    const h2 = document.createElement('h2')
    const divEdit = document.createElement('div')
    const divEditEdit = document.createElement('div')
    const divEditTrash = document.createElement('div')
    const divEditEditImage = document.createElement('img')
    const divEditTrashImage = document.createElement('img')

    divEditEdit.addEventListener('click', () => {
        openModal(id)
    })
    divEditTrash.addEventListener('click', () => {deleteItem(id)})

    divEdit.classList.add("card-edit")
    divEditEditImage.setAttribute("src", "edit.svg")
    divEditTrashImage.setAttribute("src", "trash.svg")
    divCard.classList.add("card")
    divCard.setAttribute("key", `${id}`)
    h2.innerText = title

    divEditEdit.appendChild(divEditEditImage)
    divEditTrash.appendChild(divEditTrashImage)    
    divEdit.appendChild(divEditEdit)
    divEdit.appendChild(divEditTrash)
    divCard.appendChild(h2)
    divCard.appendChild(divEdit)
    divContainer.appendChild(divCard)
}


function refreshItems(){
    const cards = document.querySelectorAll(".card")
    for (var i = 0; i < cards.length; i++){
        cards[i].remove()
    }
    renderItems()
}

function openModal(id){
    modal.classList.add("on")
    modal.setAttribute("id", id)
}


function closeModal(){
    modal.classList.remove("on")
}