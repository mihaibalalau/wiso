import Coord from "./Coord";
import Position from "./Position";

const MousePosition = (e) => {
    return Position(e.clientX, e.clientY);
}

export default MousePosition;
