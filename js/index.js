window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }
}

class Product {
    constructor(name, amount, category) {
        this.name = name
        this.amount = amount
        this.category = category
    }
}

const items = ['Bananer', 'Pasta', 'Läsk', 'Flingor', 'Mjöl', 'Socker', 'Lök', 'Potatis', 'Rödbetor']

items.forEach((item, index) => {
    items[index] = new Product(item, Math.floor(Math.random() * 5))
})


const itemList = document.querySelector('.itemList');
items.forEach(item => {
    const section = document.createElement('section')
    section.id = item

    section.addEventListener('transitionend', function(event) {
        if (event.target === this) {
            this.parentElement.removeChild(this)
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

    itemList.appendChild(section)
})