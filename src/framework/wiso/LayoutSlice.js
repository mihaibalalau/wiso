const LayoutSlice = (canvas) => {
    return {
        width() {
            return Math.round(this.renderWidth() / this.zoom());
        },
        height() {
            return Math.round(this.renderHeight() / this.zoom());
        },
        renderWidth() {
            return canvas.width;
        },
        renderHeight() {
            return canvas.height;
        },
    }
}

export default LayoutSlice;
