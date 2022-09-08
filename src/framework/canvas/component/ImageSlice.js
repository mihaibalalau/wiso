import Position from "../Position";

const ImageSlice = (config) => {
    let bitmap = config.bitmap ?? null;
    let cropStartPosition = Position(0,0);
    let cropEndPosition = bitmap ? Position(0,0) : Position(bitmap.width, bitmap.height);

    
    return {
        bitmap() {
            return bitmap
        },
        setBitmap(value, updateSize = false) {
            bitmap = value;

            if (updateSize) {
                this.setWidth(bitmap.width);
                this.setWidth(bitmap.height);
            }
        },
        render(wiso) {
            if (this.hidden()) {
                return null;
            }

            this.setPath(this.refresh(wiso));

            wiso.drawImage(this.bitmap(), wiso.drawPosition(this), wiso.drawWidth(this), wiso.drawHeight(this));
        }
    }
}

export default ImageSlice;
