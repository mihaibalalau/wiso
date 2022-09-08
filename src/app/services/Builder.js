import TextBox from "../../framework/components/TextBox";
import Components from "../../framework/constants/Components";
import Draggable from "../../framework/components/decorators/Draggable";
import Resizable from "../../framework/components/decorators/Resizable";
import Wiso from "../../framework/Wiso";
import Container from "../../framework/components/Container";
import TitledContainer from "../components/TitledContainer";
import WisoAnimation from "../../framework/animation/Animation";
import Directions from "../../framework/constants/Directions";

const applyDecorators = (item) => {
    if (item.resizable) {
        Resizable(item);
    }

    if (item.draggable) {
        Draggable(item);
    }

    return item;
}

const buildOnly = config => {
    let item;
    switch (config.type) {
        case Components.TEXTBOX:
            item = TextBox(config);
            break;
        case Components.CONTAINER:
            item = Container(config);
            break;
        case Components.TITLED_CONTAINER:
            item = TitledContainer(config);
            break;
        default:
            throw new Error('Unknow element type: ' + JSON.stringify(config));
    }

    return item;
}

const build = config => {
    const item = applyDecorators(buildOnly(config));
    item.position.move(20, 20)
    Wiso().push(item);
    // Wiso().refresh();

    return item;
}

export default build;

export { buildOnly };
