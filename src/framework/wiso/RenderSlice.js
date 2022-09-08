const RenderSlice = (canvas, context) => {
    let clipped = false;

    return {
        context,
        color() {
            return this.context.fillStyle;
        },
        setColor(color) {
            this.context.fillStyle = color;
        },
        clear() {
            const path = new Path2D();
            path.rect(0, 0, this.renderWidth(), this.renderHeight());

            // this.clip(path);

            this.context.clearRect(0, 0, canvas.width, canvas.height);
        },
        render() {
            this.children().forEach(child => {
                child.render(this)
            });

        },
        refresh() {
            this.clear();
            this.render();
        },
        clip(path) {
            if (!clipped) {
                clipped = true;
                this.save();
            }

            this.context.clip(path);
        },
        save() {
            this.context.save();
        },
        restore() {
            this.context.restore();
        },
        unclip() {
            clipped = false;
            this.restore();
            // const path = new Path2D();

            // path.rect(0, 0, this.width(), this.height());

            // this.context.clip(path);
        },
        fill(path, color = context.fillStyle) {
            this.context.fillStyle = color;
            this.context.fill(path);
        },
        stroke(path, color = context.fillStyle) {
            this.context.strokeStyle = color;
            this.context.stroke(path);
        },
        drawImage(bitmap, position, drawWidth, drawHeight) {
            this.context.drawImage(bitmap, ...position.toArray(), drawWidth, drawHeight)
        },
    }
}

export default RenderSlice;
