console.log("A burger meister is watching")
const CONTAINER_ELEMENT = document.getElementById('pattyParts')
const NUMBER_OF_PARTS = document.getElementById('quantity')

const SUBMIT_BUTTON = document.getElementById('burgerGeneratorButton')

const generateTheBurgermeister = () => {
    const numberOfPattyParts = NUMBER_OF_PARTS.value
    console.log('You want', numberOfPattyParts)
    fetch(`https://ideal-green.cmd.outerbase.io/items/random?count=${numberOfPattyParts}`, {
        'method': 'GET',
        'headers': {
            'content-type': 'application/json'
        },
    }).then(
        resp => resp.json())
        .then(
            pattyData => {
                CONTAINER_ELEMENT.innerHTML = ''
                pattyData.forEach(patty => {
                    meatStacker(patty)
                });
            }
        )
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