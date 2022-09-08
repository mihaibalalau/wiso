import build, { buildOnly } from "../../app/services/Builder";
import Components from "../constants/Components";
import Draggable from "./decorators/Draggable";

const dom = () => {
    const toolbar = document.createElement('div');
    toolbar.id = 'toolbar';

    return toolbar;
}

const items = () => {
    const items = [];

    for (const key in Components) {
        const button = document.createElement('div');
        button.classList.add('button');
        button.innerText = key;

        button.addEventListener('click', e => {
            build({
                type: Components[key]
            });
        });

        items.push(button);
    }

    return items;
}

const header = (text) => {
    const header = document.createElement('div');

    header.classList.add('header');

    header.innerText = text ?? '';

    return header;
}

const Toolbar = () => {
    const toolbar = dom();

    toolbar.appendChild(Draggable(header('Toolbar'), toolbar));

    for (const item of items()) {
        toolbar.appendChild(item);
    }

    return toolbar;
}

export default Toolbar;
