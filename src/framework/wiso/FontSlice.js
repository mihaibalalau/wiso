import Colors from "../constants/Colors";

const FontSlice = (context) => {
    let font = {
        style: 'normal',
        size: 12,
        family: 'Poppins',
        align: 'left',
        baseline: 'top',
        color: Colors.BLACK
    };

    const updateFont = () => {
        context.font = `${font.style} ${font.size}px ${font.family}`;
        context.textAlign = font.align;
        context.textBaseline = font.baseline;
        context.fillStyle = font.color;
        context.strokeStyle = font.color;
    }

    return {
        font() {
            return font;
        },
        setFont(newFont) {
            for (const key in newFont) {
                if (font[key] !== undefined) {
                    font[key] = newFont[key]
                }
            }
            updateFont();
        },
        fillText(text, position, color = font.color) {
            font.color = color;

            updateFont();

            this.context.fillText(text, ...position.toArray());
        },
        strokeText(text, position, color = font.color) {
            font.color = color;

            updateFont();

            this.context.strokeText(text, ...position.toArray());
        },
    }
}

export default FontSlice;
