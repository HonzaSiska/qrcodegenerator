document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector("#text")
    const startOfSequence = document.querySelector("#start")
    const endOfSequence = document.querySelector("#end")
    const outputImagePlaceholder = document.querySelector("#output")
    const printBtn = document.querySelector("#print")
    let printableArea = document.querySelector("#printable")
    let newQrCodeUrl = ""

    const generateCode = () => {
        printableArea.innerHTML=""
        let insertedText = text.value
        console.log(insertedText)
        const insertedTextRemovedSpaces = insertedText.replace(" ", "")
        newQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${insertedTextRemovedSpaces}`
        outputImagePlaceholder.innerHTML = `<img src=${newQrCodeUrl}/>`
        console.log(newQrCodeUrl)
    }

    const print = () => {

        if (text.value === "") {
            alert('Vlož text !!!')
            return
        }
        if (isNaN(startOfSequence.value)) {
            console.log(typeof (startOfSequence))
            alert('Zadej počáteční číslo série !!!')
            return
        }
        if (isNaN(endOfSequence.value)) {
            alert('Zadej počet etiket !!!')
            return
        }

    
        printableArea.innerHTML = ''
        let label = ''
        allLabels = ''
        let counter = startOfSequence.value

        for (let i = counter; i <= endOfSequence.value; i++) {
            label += `
        <div class="label-wrapper">
            <div class='label-subwrapper'>
                <div class="label-header">
                    <h1 class="label-title">${i}</h1>
                </div>
                <div class="label-body">
                    <img src="${newQrCodeUrl}" alt="QR" />
                </div>
                <div class="label-footer">

                </div>
            </div>
        </div>
    `
        }

        allLabels += label

        printableArea.innerHTML += allLabels

        // let bottomY = window.innerHeight
        // console.log('bottomY', )
        window.scrollTo(0,200);

    }
    text.addEventListener("keyup", generateCode)
    printBtn.addEventListener("click", print)
    startOfSequence.addEventListener("keyup", () => {
        printableArea.innerHTML = ''
    })
    endOfSequence.addEventListener("keyup", () => {
        printableArea.innerHTML = ''
    })
})

