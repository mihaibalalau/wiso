import Component from "../../../framework/canvas/Component";
import Colors from "../../../framework/constants/Colors";
import FloatPositions from "../../../framework/constants/FloatPositions";

const ContextMenuItem = (config) => {
    return Component({
        width: 50,
        height: 50,
        floatPosition: FloatPositions.TOPLEFT,
        color: Colors.NICE_BLUE,
        text: 'test',
        stroke: true,
        strokeColor: Colors.BLACK,
        ...config,
    });
}

export default ContextMenuItem;
