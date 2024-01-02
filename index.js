console.log("A burger meister is watching")
const CONTAINER_ELEMENT = document.getElementById('pattyParts')
const NUMBER_OF_PARTS = document.getElementById('quantity')
const BURGER_REQUEST_PROCESS_BAR = document.getElementById('burgerRequestProcess')
const BURGER_LOADER_CONTAINER = document.getElementById('burgerLoader')
const SUBMIT_BUTTON = document.getElementById('burgerGeneratorButton')
const getTotalItemsInDatabase = async () => {
    const response = await fetch("https://ideal-green.cmd.outerbase.io/max")
    const data = await response.json()
    const total = data.response.items[0].total
    return total
}
getTotalItemsInDatabase()
const generateTheBurgermeister = async () => {
    CONTAINER_ELEMENT.innerHTML = ''
    const numberOfPattyParts = NUMBER_OF_PARTS.value
    BURGER_LOADER_CONTAINER.style.display = 'flex'

    BURGER_REQUEST_PROCESS_BAR.max = numberOfPattyParts
    let numberOfParts = 0
    const parts = []
    // Fetch until max

    while (numberOfParts < numberOfPattyParts) {
        const response = await fetch(`https://ideal-green.cmd.outerbase.io/items/random?count=${numberOfPattyParts}`, {
            'method': 'GET',
            'headers': {
                'content-type': 'application/json'
            },
        })
        const pattyData = await response.json()
        
        pattyData.forEach(patty => {
            if (numberOfParts < numberOfPattyParts) {
                parts.push(patty)
                console.log(numberOfPattyParts, 'out of', parts.length)
                BURGER_REQUEST_PROCESS_BAR.value = parts.length
                numberOfParts += 1
            } 

        });
    }
    
    parts.forEach(patty => {
        meatStacker(patty)
    })
BURGER_LOADER_CONTAINER.style.display = 'none'
}
SUBMIT_BUTTON.onclick = generateTheBurgermeister

const meatStacker = (patty) => {
    const {
        count,
        id,
        image_data,
        name,
    } = patty
    const imageElement = document.createElement('img')
    // TODO Change to be image source base64
    imageElement.src = image_data
    CONTAINER_ELEMENT.appendChild(imageElement)

}