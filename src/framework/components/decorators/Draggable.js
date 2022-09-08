import Events from "../../constants/Events";
import Coord from "../../canvas/Coord";
import MousePosition from "../../canvas/MousePosition";
import Wiso from "../../Wiso";

const Draggable = (item, target) => {
    let targetPosition;

    target = target || item;

    item.draggable = true;


    const drag = (initial, offset) => {
        if (offset.x === 0 && offset.y === 0) {
            return false;
        } else {
            target.position = targetPosition.add(offset);
        }
    };

    const dragEnd = (initial, offset) => {
        Wiso().deafen(Events.DRAG, drag)
        Wiso().deafen(Events.DRAG_END, dragEnd)

        return false;
    }

    Wiso().listen(Events.DRAG_START, (current) => {
        targetPosition = target.position.new();

        Wiso().listen(Events.DRAG, drag);
        Wiso().listen(Events.DRAG_END, dragEnd)

        return false;
    }, item);

    return item;
}

export default Draggable;
