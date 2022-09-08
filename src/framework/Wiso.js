import MainCanvas from "./ui/MainCanvas";
import Toolbar from "./ui/Toolbar";
import Options from "./ui/Options";
import Position from "./canvas/Position";
import FloatTypes from "./constants/FloatTypes";
import FloatPositions from "./constants/FloatPositions";
import TreeSlice from "./wiso/TreeSlice";
import FontSlice from "./wiso/FontSlice";
import ContextSlice from "./wiso/RenderSlice";
import LayoutSlice from "./wiso/LayoutSlice";
import EventSlice from "./wiso/EventSlice";

let wiso;

const initDOM = () => {
    const canvas = MainCanvas();
    const toolbar = Toolbar();
    const options = Options();

    document.body.appendChild(canvas);
    document.body.appendChild(toolbar);
    document.body.appendChild(options);

    return {
        canvas,
        toolbar,
        options,
    };
}

const Wiso = (canvas) => {
    return wiso;
}

const initWiso = (canvas, {
    singleton = true,
    zoomable = false,
} = {}) => {
    const context = canvas.getContext('2d');

    let focusedItem;
    let zoom = 1;
    let minZoom = .1
    let maxZoom = 100;
    let offsetPosition = Position(0, 0);

    const newWiso = {
        ...LayoutSlice(canvas),
        ...TreeSlice(),
        ...FontSlice(context),
        ...ContextSlice(canvas, context),
        ...EventSlice(canvas),

        isItemTargeted(item, coord, fillRule) {
            return this.context.isPointInPath(item.areaPath(this), coord.x, coord.y, fillRule)
        },
        focus(item) {
            focusedItem = item
        },
        getFocusedItem() {
            return focusedItem;
        },
        zoom() {
            return zoom;
        },
        minZoom() {
            return minZoom;
        },
        maxZoom() {
            return maxZoom;
        },
        offsetPosition() {
            return offsetPosition
        },
        setOffsetPosition(newOffset) {

            offsetPosition = newOffset;
        },
        setZoom(newZoom) {
            if (newZoom < this.minZoom()) {
                newZoom = this.minZoom()
            }
            if (newZoom > this.maxZoom()) {
                newZoom = this.maxZoom()
            }

            zoom = parseFloat(newZoom.toFixed(4));
        },
        setMinZoom(newMinZoom) {
            minZoom = newMinZoom;
        },
        setMaxZoom(newMaxZoom) {
            maxZoom = newMaxZoom;
        },
        setZoomable(newZoomable) {
            zoomable = zoomable;
        },
        drawWidth(item) {
            return item.width() * (item.zoomable() ? this.zoom() : 1);
        },
        drawHeight(item) {
            return item.height() * (item.zoomable() ? this.zoom() : 1);
        },
        drawPosition(item) {
            if (!item) {
                return Position((this.renderWidth() - this.width()) / 2, (this.renderHeight() - this.height()) / 2).add(this.offsetPosition().multiplyScalar(this.zoom()));
            }

            let parentDrawPosition;
            let parentDrawWidth;
            let parentDrawHeight;

            const parent = item.parent();

            if (item.float() === FloatTypes.ABSOLUTE) {
                return item.position();
            } else if (!parent) {
                parentDrawPosition = this.drawPosition();
                parentDrawWidth = this.width();
                parentDrawHeight = this.height();
            } else {
                parentDrawPosition = this.drawPosition(parent);
                parentDrawWidth = this.drawWidth(parent);
                parentDrawHeight = this.drawHeight(parent);
            }

            let defaultDrawPosition;
            const drawWidth = wiso.drawWidth(item);
            const drawHeight = wiso.drawHeight(item);

            switch (item.floatPosition()) {
                case FloatPositions.TOPLEFT:
                    defaultDrawPosition = parentDrawPosition;
                    break
                case FloatPositions.TOP:
                    defaultDrawPosition = parentDrawPosition.add(parentDrawWidth / 2 - drawWidth / 2, 0);
                    break
                case FloatPositions.TOPRIGHT:
                    defaultDrawPosition = parentDrawPosition.add(parentDrawWidth - drawWidth, 0);
                    break
                case FloatPositions.RIGHT:
                    defaultDrawPosition = parentDrawPosition.add(parentDrawWidth - drawWidth, parentDrawHeight / 2 - drawHeight / 2);
                    break
                case FloatPositions.BOTTOMRIGHT:
                    defaultDrawPosition = parentDrawPosition.add(parentDrawWidth - drawWidth, parentDrawHeight - drawHeight);
                    break
                case FloatPositions.BOTTOM:
                    defaultDrawPosition = parentDrawPosition.add(parentDrawWidth / 2 - drawWidth / 2, parentDrawHeight - drawHeight);
                    break
                case FloatPositions.BOTTOMLEFT:
                    defaultDrawPosition = parentDrawPosition.add(0, parentDrawHeight - drawHeight);
                    break
                case FloatPositions.LEFT:
                    defaultDrawPosition = parentDrawPosition.add(0, parentDrawHeight / 2 - drawHeight / 2);
                    break
                case FloatPositions.CENTER:
                    defaultDrawPosition = parentDrawPosition.add(parentDrawWidth / 2 - drawWidth / 2, parentDrawHeight / 2 - drawHeight / 2);
                    break
                default:
                    throw new Error(`Unknow item float position: ${item.floatPosition()}`)
            }

            return defaultDrawPosition.add(item.position().multiplyScalar((item.zoomable() ? this.zoom() : 1)));
        },
        drawLength(value, item) {
            return value * (item.zoomable() ? this.zoom() : 1);
        },
    };

    if (singleton) {
        wiso = newWiso

        globalThis.wiso = wiso;
    }


    return newWiso;
}

export default Wiso;

export { initWiso };
