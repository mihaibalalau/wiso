const TextArea = ({value}) => {
    const textArea = document.createElement('textarea');
    textArea.value = value;

    return textArea
}

export default TextArea;
