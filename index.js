console.log("A burger meister is watching")
const CONTAINER_ELEMENT = document.getElementById('pattyParts')

fetch("https://ideal-green.cmd.outerbase.io/items/random?count=4", {
    'method': 'GET',
    'headers': {
        'content-type': 'application/json'
    },
}).then(
    resp => resp.json())
    .then(
        pattyData => {
            pattyData.forEach(patty => {
                meatStacker(patty)
            });
            console.log(pattyData)
        }
    )

const meatStacker = (patty) => {
    const {
        count,
        id,
        image_data,
        name,
    } = patty
    console.log('This is a', name)
    const imageElement = document.createElement('img')
    // TODO Change to be image source base64
    imageElement.src = image_data
    CONTAINER_ELEMENT.appendChild(imageElement)

}