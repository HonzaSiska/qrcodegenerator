document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector("#text")
    const startOfSequence = document.querySelector("#start")
    const endOfSequence = document.querySelector("#end")
    const outputImagePlaceholder = document.querySelector("#output")
    const printBtn = document.querySelector("#print")
    // let printableArea = document.querySelector("#printable")
    let newQrCodeUrl = ""
    let printableArea = document.querySelector("#printable")
    const docsLinkField = document.querySelector("#text2")
    const sheetsIcon = document.querySelector('#sheets-icon')
    const docsIcon = document.querySelector('#docs-icon')

    const state = {
        docs: "googlesheets",

    }

    const generateCode = () => {

        let printableArea = document.querySelector("#printable")
        printableArea.innerHTML = ""

        let insertedText = text.value

        const insertedTextRemovedSpaces = insertedText.replace(" ", "")
        console.log('testing qr obsah',insertedTextRemovedSpaces)
    
        newQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${insertedTextRemovedSpaces}`

        outputImagePlaceholder.innerHTML = `<img src=${newQrCodeUrl} />`

    }

    const print = () => {

        const startOfSequence = document.querySelector("#start")
        const endOfSequence = document.querySelector("#end")

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
        let allLabels = ''
        let counter = Number(startOfSequence.value)

        for (let i = 0; i <= Number(endOfSequence.value) - 1; i++) {
            label += `
                <div class="label-wrapper">
                    <div class='label-subwrapper'>
                    <div class="label-header">
                    ` 
                    
                    if(counter > 0){ label+=` <h1 class="label-title">${i + counter}</h1> `}
                 
                    label+= `  
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

        window.scrollTo(0, 200);

    }

    const parseGoogleUrl = () => {

        const urlParams = window.location.href
        const brokenDownUrl = urlParams.split("/")
        console.log('URL',brokenDownUrl)
        

        const removeSlashes = docsLinkField.value.split("/")
        // console.log('sbroken down url', removeSlashes)
        let host

        // Change urls when deployed
        if (brokenDownUrl[0] == 'http:') {
            host = 'local'
        } else {
            host = 'public'
        }

        console.log('host',host)

        const param = removeSlashes[6]
        const type = removeSlashes[3]


        if (type === 'document' && state.docs === 'googlesheets') {
            alert('Vlož platný Google docs document')
            text.value = ''
            return
        }
        if (type === 'spreadsheets' && state.docs === 'docs') {
            alert('Vlož platný Google spreadsheets document')
            text.value = ''
            return
        }
        console.log('type', type)
        console.log(state)

        // const newLink =
        //     `http://127.0.0.1:5500/data.html?param=${param}&document=${state.docs}`

        const newLink =  host === 'local' 
        ? host = `http://127.0.0.1:5500/data.html?param=${param}&document=${state.docs}`
        : host = `https://honzasiska.github.io/qrcodegenerator/data.html?param=${param}&document=${state.docs}`
      
        text.value = newLink

        console.log('new link',newLink)

        generateCode()

    }

    const hideRightShowLeftCaret = () => {
        const caretRight = document.querySelector('#left-caret')
        const caretLeft = document.querySelector('#right-caret')
        caretLeft.classList.remove('hidden')
        caretRight.classList.add('hidden')
    }
    const hideLeftShowRightCaret = () => {
        const caretRight = document.querySelector('#left-caret')
        const caretLeft = document.querySelector('#right-caret')
        caretLeft.classList.add('hidden')
        caretRight.classList.remove('hidden')
    }


    const showFieldForGoogleSheetLink = () => {
        text.value = ''
        const docsWrapper = document.querySelector('#docs-wrapper')
        docsWrapper.classList.remove('hidden')
        state.docs = 'googlesheets'
        hideLeftShowRightCaret()
        docsLinkField.value = ''
        docsLinkField.setAttribute('placeholder', 'Vlož odkaz na google spreadsheet tabulky')
       
    }

    const showFieldForDocsLink = () => {
        text.value = ''
        const docsWrapper = document.querySelector('#docs-wrapper')
        docsWrapper.classList.remove('hidden')
        state.docs = 'docs'
        hideRightShowLeftCaret()
        
        docsLinkField.value = ''
        docsLinkField.setAttribute('placeholder', 'Vlož odkaz na google document')
       
    }

  

    text.addEventListener("keyup", generateCode)

    printBtn.addEventListener("click", print)

    startOfSequence.addEventListener("keyup", () => {
        printableArea.innerHTML = ''
    })

    endOfSequence.addEventListener("keyup", () => {
        printableArea.innerHTML = ''
    })

    docsLinkField.addEventListener('change', () => {
        parseGoogleUrl()
    })

    sheetsIcon.addEventListener('click', showFieldForGoogleSheetLink)

    docsIcon.addEventListener('click', showFieldForDocsLink)


})

