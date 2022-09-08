const Resizable = (item) => {
    
    item.resizable = true;
    item.wheel = (e) => {
        let factor = 5;
        let sign = 1;
        let h = true;
        let w = true;

        if (e.deltaY > 0) { // Wheel down
            sign = -1
        }

        if (e.shiftKey) {
            h = false;
        }

        if (e.altKey) {
            w = false;
        }

        if (e.ctrlKey) {
            factor *= 10;
        }

        if (h) {
            item.height += factor * sign;
            if (item.height < item.minHeight) {
                item.height = item.minHeight
            }
        }

        if (w) {
            item.width += factor * sign;
            if (item.width < item.minWidth) {
                item.width = item.minWidth
            }
        }

    }

    return item;
};

export default Resizable;
