const Coord = (x, y) => {
    const coord = {
        x: 0,
        y: 0,
        set(x, y) {
            if (y !== undefined) {
                this.x = x;
                this.y = y;
            } else if (x) {
                if (x.x) {
                    this.x = x.x;
                }
                if (x.y) {
                    this.y = x.y;
                }
            }
        },
    }

    coord.set(x, y);

    return coord
}

export default Coord;
