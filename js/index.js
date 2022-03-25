window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js');
    }
}
class App {
    constructor() {
        this.items = []
        this.loadItems()
    }
    loadItems() {
        JSON.parse(localStorage.getItem('items')).forEach((item,index) => {
            this.items[index] = {
                "name" : item.name,
                "amount" : item.amount
            }
        })
    }
    renderItems() {
        this.items.forEach(item => {
            this.renderItem(item)
        })
    }
    renderItem(item) {
        const itemList = document.querySelector('.itemList');
        
        const section = document.createElement('section')
        section.id = item.name
    
        section.addEventListener('transitionend', (event) => {
            if (event.target === section) {
                section.parentElement.removeChild(section)
                this.removeItem(section.id)
            }
            
        })
    
        const input = document.createElement('input')
        input.type = "checkbox"
        input.id = `${item.name}_checkbox`
        section.appendChild(input)
        
        const label = document.createElement('label')
        label.htmlFor = input.id
        label.innerText = `${item.amount ? item.amount + "st" : ""} ${item.name}`
    
        label.addEventListener('transitionend', function(event) {
            if (event.propertyName === "transform") {
                const parent = this.parentElement
                parent.style.transition = "0.5s"
                parent.style.opacity = "0"
            }
          });
        section.appendChild(label)
        itemList.insertBefore(section, itemList.firstChild)
    }
    addItem(object) {
        this.items.push(object)
        this.renderItem(object)
        this.saveItems()
    }
    saveItems() {
        localStorage.setItem('items', JSON.stringify(this.items))
    }
    removeItem(itemName) {
        for (let i = 0; i < this.items.length; i++) {
            const element = this.items[i];
            if (element.name === itemName) {
                this.items.splice(i, 1)
                break
            }
        }
        this.saveItems()
    }
}

const app = new App()
app.renderItems()

const addItemToggle = document.getElementById('addItemToggle')
addItemToggle.addEventListener('click', () => {
    const addItemSection = document.getElementById('addItemSection')
    addItemSection.classList.toggle('displayNone')
})

const addItem = document.getElementById('addItem')
addItem.addEventListener('click', () => {
    
    if (!itemName.value || !itemAmount.value) {
        return
    }
    const object = {
        "name" : itemName.value,
        "amount" : itemAmount.value
    }
    app.addItem(object)
    itemName.value = ""
    itemAmount.value = 1
})

const itemName = document.getElementById('itemName')
itemName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addItem.click()
})
const itemAmount = document.getElementById('itemAmount')
itemAmount.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addItem.click()
    itemName.focus()
})


