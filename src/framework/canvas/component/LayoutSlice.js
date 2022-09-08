import Colors from "../../constants/Colors";

const LayoutSlice = () => {
    let width = 0;
    let height = 0;
    let color = Colors.BLANK;
    let strokeColor = Colors.BLANK;
    let fill = true;
    let stroke = false;
    let zoomable = true;

    return {
        width() {
            return width;
        },
        height() {
            return height;
        },
        color() {
            return color;
        },
        strokeColor() {
            return strokeColor
        },
        setStrokeColor(newStrokeColor) {
            strokeColor = newStrokeColor
        },
        isFill() {
            return fill
        },
        isStroke() {
            return stroke;
        },
        setWidth(newWidth) {
            width = newWidth;
        },
        setHeight(newHeight) {
            height = newHeight;
        },
        setColor(newColor) {
            color = newColor;
        },
        setFill(newFill) {
            fill = newFill;
        },
        setStroke(newStroke) {
            stroke = newStroke
        },
        zoomable() {
            if (this.parent() && typeof this.parent().zoomable === "function") {
                return zoomable && this.parent().zoomable();
            }

            return zoomable;
        },
        setZoomable(newZoomable) {
            zoomable = newZoomable
        },
    }
}

export default LayoutSlice;
