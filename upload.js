console.log('Youre on the upload page')

const PATTY_NAME_ELEMENT = document.getElementById('layerName')
const BURGER_IMAGE_ELEMENT = document.getElementById('burgerImage')
const UPLOAD_BUTTON = document.getElementById('uploadPattyMachine')

UPLOAD_BUTTON.onclick = () => {
    console.log('Clickable!')
    const pattyName = PATTY_NAME_ELEMENT.value
    const file = BURGER_IMAGE_ELEMENT.files[0]
    const reader = new FileReader()
    reader.addEventListener(
        "load",
        () => {
            const payload = {
                name: pattyName,
                imageData: reader.result,
                count: 0
            }
            fetch("https://ideal-green.cmd.outerbase.io/items", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(payload)
            })
                .then((response) => response.text())
                .then(data => console.log('The api says', data))
        },
        false,
    );


    if (file) {
        reader.readAsDataURL(file);
    }
}
