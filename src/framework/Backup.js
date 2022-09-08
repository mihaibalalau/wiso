const downloadFile = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const save = () => {
    downloadFile(JSON.stringify(wiso.children), Date.now() + '.json', 'text/plain');
}

const readFile = async (file) => {
    
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = e => {
            resolve(e.target.result);
        };

        fileReader.readAsText(file)
    })

}

const restore = (file) => {
    readFile(file)
    .then(contents => {
        console.log(contents);
    })
}

export { save, restore };