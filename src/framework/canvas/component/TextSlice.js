import Colors from "../../constants/Colors";
import Wiso from "../../Wiso";
import Coord from "../Coord";

const ellipseLine = (words, width) => {
    const ellipse = '...';
    const context = Wiso().context;

    if (width > context.measureText(words.join(' ')).width) {
        return words.join(' ');
    }

    do {
        words.pop();
    } while (width < context.measureText(words.join(' ') + ellipse).width)

    return words.join(' ') + ellipse;
}

const textToLines = (text, wiso, lineHeight, width, height) => {
    const words = text.split(' ');
    const lines = [];
    const line = [];
    let currentWord = 0;

    for (const word of words) {
        line.push(word);

        if (width < wiso.context.measureText(line.join(' ')).width) {
            const excessWord = line.pop();

            if (height < (lines.length + 2) * lineHeight) {
                if (currentWord < words.length - 1) {
                    line.push(words[currentWord + 1]);
                    lines.push(ellipseLine(line, width));
                    return lines;
                }
            }

            lines.push(line.join(' '));
            line.length = 0;
            line.push(excessWord);
        }

        currentWord++;
    }

    if (line.length) {
        lines.push(line.join(' '));
    }

    return lines;
}

const TextSlice = (config) => {
    let text = '';
    let lineHeight = null;
    let fontSize = 14;
    let fontFamily = 'sans-serif';
    let fontStyle = '';
    let fontColor = Colors.BLACK;
    let fontFill = true;
    let fontStroke = false;
    let padding = 10;
    let multiLine = true;
    let overflow = true;
    let textPosition;

    return {
        text() {
            return text;
        },
        setText(newText) {
            text = newText
        },
        lineHeight() {
            return lineHeight || Math.round(parseInt(fontSize) * 1.2);
        },
        setLineHeight(newLineHeight) {
            lineHeight = newLineHeight
        },
        fontSize() {
            return fontSize;
        },
        setFontSize(newFontSize) {
            fontSize = newFontSize;
        },
        fontFamily() {
            return fontFamily;
        },
        setFontFamily(newFontFamily) {
            fontFamily = newFontFamily;
        },
        fontStyle() {
            return fontStyle;
        },
        setFontStyle(newFontStyle) {
            fontStyle = newFontStyle;
        },
        fontColor() {
            return fontColor;
        },
        setFontColor(newFontColor) {
            fontColor = newFontColor;
        },
        fontFill() {
            return fontFill;
        },
        setFontFill(newFontFill) {
            fontFill = newFontFill;
        },
        fontStroke() {
            return fontStroke;
        },
        setFontStroke(newFontStroke) {
            fontStroke = newFontStroke;
        },
        padding() {
            return padding;
        },
        setPadding(newPadding) {
            padding = newPadding;
        },
        multiLine() {
            return multiLine;
        },
        setMultiLine(newMultiLine) {
            multiLine = newMultiLine;
        },
        overflow() {
            return overflow;
        },
        setOverflow(newOverflow) {
            overflow = newOverflow;
        },
        textPosition() {
            return textPosition;
        },
        setTextPosition(newTextPosition) {
            textPosition = newTextPosition
        },
        render(wiso) {
            if (this.hidden()) {
                return null;
            }
            this.setPath(this.refresh(wiso));

            if (this.isFill()) {
                wiso.fill(this.path(), this.color());
            }

            if (this.isStroke()) {
                wiso.stroke(this.path(), this.strokeColor())
            }

            const padding = wiso.drawLength(this.padding(), this);

            const textPosition = wiso.drawPosition(this).add(this.textPosition() ?? Coord(padding, padding));

            wiso.setFont({
                style: this.fontStyle(),
                color: this.fontColor(),
                size: wiso.drawLength(this.fontSize(), this),
                family: this.fontFamily(),
            });

            let lines;
            const drawWidth = wiso.drawWidth(this);
            const drawHeight = wiso.drawHeight(this);
            const lineHeight = wiso.drawLength(this.lineHeight(), this);

            if (this.multiLine()) {
                lines = textToLines(this.text(), wiso, lineHeight, drawWidth - padding * 2, drawHeight - padding * 2);
            } else {
                lines = [ellipseLine(this.text().split(' '), drawWidth - padding * 2)];
            }

            if (this.overflow()) {
                wiso.clip(this.path())
            }

            lines.forEach((line, index) => {
                if (this.fontFill()) {
                    wiso.fillText(line, textPosition.add(Coord(0, index * lineHeight)))
                }
                if (this.fontStroke()) {
                    wiso.strokeText(line, textPosition.add(Coord(0, index * lineHeight)))
                }
            });

            wiso.unclip();
        }
    }
}

export default TextSlice;
