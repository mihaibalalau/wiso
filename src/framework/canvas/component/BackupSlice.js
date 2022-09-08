import Colors from "../../constants/Colors";
import Component from "../Component";
import Position from "../Position";

const BackupSlice = () => {
    return {
        dump() {
            console.log({
                ...this.getState(),
                id: this.id(),
            });
        },
        getState() {
            return {
                width: this.width(),
                height: this.height(),
                color: this.color(),
                strokeColor: this.strokeColor(),
                fill: this.isFill(),
                stroke: this.isStroke(),
                children: this.children(),
                float: this.float(),
                floatPosition: this.floatPosition(),
                position: this.position().get(),
                zoomable: this.zoomable(),
                hidden: this.hidden(),
                ...(typeof this.text === "function" ? {
                    text: this.text(),
                    //...
                } : {})
            }
        },
        restoreState(state) {
            this.setWidth(state.width);
            this.setHeight(state.height);
            this.setColor(state.color);
            this.setStrokeColor(state.strokeColor);
            this.setFill(state.fill);
            this.setStroke(state.stroke);
            state.children.forEach(child => this.push(Component(child)));
            this.setFloat(state.float);
            this.setFloatPosition(state.floatPosition);
            this.setPosition(Position(state.position));
            this.setZoomable(state.zoomable)
            this.setHidden(state.hidden)
            if (state.text) {
                this.setText(state.text);
                this.setLineHeight(state.lineHeight);
                this.setFontSize(state.fontSize);
                this.setFontFamily(state.fontFamily);
                this.setFontStyle(state.fontStyle);
                this.setFontColor(state.fontColor);
                this.setFontFill(state.fontFill);
                this.setFontStroke(state.fontStroke);
                this.setPadding(state.padding);
                this.setMultiLine(state.multiLine);
                this.setOverflow(state.overflow);
            }
        },
    }
}

export default BackupSlice;
