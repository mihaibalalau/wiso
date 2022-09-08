import Colors from "../constants/Colors"
import Components from "../constants/Components"
import Coord from "../canvas/Coord";
import Wiso from "../Wiso";
import Component from "../canvas/Component";

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

const textToLines = (text, item, canvas) => {
    const words = text.split(' ');
    const lines = [];
    const line = [];
    const width = item.drawWidth() - item.drawPadding * 2
    const height = item.drawHeight() - item.drawPadding * 2
    let currentWord = 0;

    for (const word of words) {
        line.push(word);

        if (width < canvas.context.measureText(line.join(' ')).width) {
            const excessWord = line.pop();

            if (height < (lines.length + 2) * item.lineHeight) {
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

const TextBox = (config = {}) => {

    const item = Component({
        type: Components.TEXTBOX,
        text: 'Type something',
        fontFamily: 'sans-serif',
        fontSize: 14,
        fontStyle: 'small-caps',
        color: Colors.WHITE,
        fill: true,
        stroke: false,
        bgColor: Colors.BLANK,
        bgStrokeColor: Colors.BLACK,
        bgFill: true,
        bgStroke: false,
        _lineHeight: null,
        minWidth: 100,
        minHeight: 40,
        padding: 10,
        multiLine: true,

        ...config,

        get lineHeight() {
            return this._lineHeight || Math.round(parseInt(this.fontSize) * 1.2);
        },
        set lineHeight(value) {
            this._lineHeight = value;
        },
        drawPadding() {
            return this.padding * this.parent().zoom();
        },
        render() {
            const wiso = Wiso();

            if (this.bgFill) {
                wiso.fill(this.path(), this.bgColor);                
            }

            if (this.bgStroke) {
                wiso.stroke(this.path(), this.bgStrokeColor);                
            }

            const padding = this.drawPadding();

            const textPosition = this.drawPosition().add(Coord(padding, padding));
            
            wiso.setFont({
                style: this.fontStyle,
                color: this.color,
                size: this.fontSize * this.parent().zoom(),
                family: this.fontFamily,
            });

            let lines;

            if (this.multiLine) {
                lines = textToLines(this.text, this, wiso);
            } else {
                lines = [ellipseLine(this.text.split(' '), this.drawWidth() - padding * 2)];
            }

            lines.forEach((line, index) => {
                if (this.fill) {
                    wiso.fillText(line, textPosition.add(Coord(0, index * this.lineHeight)))
                }
                if (this.stroke) {
                    wiso.strokeText(line, textPosition.add(Coord(0, index * this.lineHeight)))
                }
            });
        }
    });

    Wiso

    return item;
}

export default TextBox;
