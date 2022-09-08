const inputId = 'command-input';

const inputComponent = (() => {
    const input = document.createElement('input');
    input.id = inputId;

    return input;
})();

const CommandProvider = (wiso, canvas) => {

    // if (!document.getElementById(inputId)) {
    //     document.body.append(inputComponent);
    // }


    document.addEventListener('keypress', e => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e);
        if (e.keyCode) {

        }

    })
}

export default CommandProvider;
