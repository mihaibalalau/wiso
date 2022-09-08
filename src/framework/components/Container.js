import Colors from "../constants/Colors";
import Components from "../constants/Components";
import Component from "../canvas/Component";

const Container = (config) => {
    const defaultConfig = {
        type: Components.CONTAINER,
        color: Colors.WHITE
    }

    return Component({
        ...defaultConfig,
        ...config,
        refresh() {
            const path = new Path2D();
            path.rect(...this.drawPosition().toArray(), this.width, this.height);
            return path;
        }
    });
}

export default Container;
