import Coord from "../../canvas/Coord";
import MousePosition from "../../canvas/MousePosition";
import Position from "../../canvas/Position";

const Draggable = (dom, target) => {
    target = target ?? dom;

    let initialMousePosition;
    let initialItemPosition;

    const move = e => {
        const currentMousePosition = MousePosition(e);
        const offset = initialMousePosition.diff(currentMousePosition);
        const newItemPosition = initialItemPosition.add(offset);
        target.style.left = newItemPosition.x;
        target.style.top = newItemPosition.y;
    }

    const end = e => {
        initialMousePosition = null;
        document.body.removeEventListener('mousemove', move);
        document.body.removeEventListener('mouseup', end);
    };
    

    dom.addEventListener('mousedown', e => {
        initialMousePosition = MousePosition(e);
        initialItemPosition = Position(target.offsetLeft, target.offsetTop);
        
        document.body.addEventListener('mousemove', move);
        document.body.addEventListener('mouseup', end);
    });

    dom.classList.add('draggable');

    return dom;
}

export default Draggable