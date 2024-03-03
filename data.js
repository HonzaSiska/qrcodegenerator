

//src="https://docs.google.com/document/d/e/2PACX-1vTMmfqRwN57owCZDMBmdYGVVZkQ9AhrY4Q6j-n8MqRif3bjrjVy-aKEDuLgu6raszyRzZQLOkCtiaLP/pub?embedded=true"

document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search)

    const param = urlParams.get('param')
    const docsParam =  urlParams.get('document')
    console.log(param)
    console.log(docsParam)
    // const getParamFromUrl = urlParams.split('?')
    // console.log(getParamFromUrl); // Output: "John"
    const result = document.querySelector("#embeded-doc")

    // const html = `<iframe src="https://docs.google.com/document/d/e/${param}/pub?embedded=true"></iframe>`

    // <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQrDARC4GyELW3xNzJhzXfv-WvQ2hJww6Djr2HkZJ4tvCsd8R0EktUzvWFI6R8f36iVAcpIE_5_kArF/pubhtml?widget=true&amp;headers=false"></iframe>
    const newUrl =   docsParam === 'docs' 
        ?   `https://docs.google.com/document/d/e/${param}/pub?embedded=true`
        :   `https://docs.google.com/spreadsheets/d/e/${param}/pubhtml?widget=true&amp;headers=false`

    document.querySelector('#embeded-doc').setAttribute('src', newUrl)



})