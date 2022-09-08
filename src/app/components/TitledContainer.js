import Colors from "../../framework/constants/Colors";
import Components from "../../framework/constants/Components";
import Component from "../../framework/canvas/Component";
import TextBox from "../../framework/components/TextBox";
import Draggable from "../../framework/components/decorators/Draggable";
import FloatPositions from "../../framework/constants/FloatPositions";

const TitledContainer = (config) => {

    const item = Component({
        type: Components.TITLED_CONTAINER,
        title: 'Title',
        color: Colors.LIGHT_TRANSPARENT,
        width: 400,
        floatPosition: FloatPositions.CENTER,
        ...config,
        refresh() {
            const path = new Path2D();
            path.rect(...this.drawPosition().toArray(), this.drawWidth(), this.drawHeight());

            return path;
        },
    });

    const textBoxHeight = 40

    item.addComponent(TextBox({
        text: item.title,
        color: Colors.WHITE,
        bgColor: Colors.BLACK,
        height: textBoxHeight,
        width: item.width,
        floatPosition: FloatPositions.TOP,
        zoomable: false,
    }));

    return item;
}

export default TitledContainer;
