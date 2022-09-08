import FloatPositions from "../../constants/FloatPositions";
import FloatTypes from "../../constants/FloatTypes";
import Wiso from "../../Wiso";
import Position from "../Position";

const PositionSlice = (item) => {
    let float = FloatTypes.RELATIVE;
    let floatPosition = FloatPositions.CENTER;
    let position = Position(0, 0);

    return {
        float() {
            return float
        },
        floatPosition() {
            return floatPosition
        },
        position() {
            return position
        },
        setFloat(newFloat) {
            float = newFloat
        },
        setFloatPosition(newFloatPosition) {
            floatPosition = newFloatPosition
        },
        setPosition(newPosition) {
            position = newPosition
        },
    }
}

export default PositionSlice;
