function onOff() {
    document.querySelector('#modal')
        .classList
        .toggle('hide')

    document.querySelector('#modal')
        .classList
        .toggle('addScroll')

    document.querySelector('body')
        .classList
        .toggle('hideScroll')
}


function checkFields(event) {
    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link"
    ]

    const isEmpty = valuesToCheck.find(function(value) {
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if (checkIfIsString && checkIfIsEmpty) {
            return true
        }
    })

    if (isEmpty) {
        event.preventDefault()
        const messageField = document.getElementById('message')
        messageField.classList.remove("hide")
        messageField.innerHTML = 'Preencha todos os campos'
    }
}