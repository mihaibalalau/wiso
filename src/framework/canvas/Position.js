import Coord from "./Coord";

const Position = (x, y) => {
    const position = {
        ...Coord(x, y),

        move(x, y) {
            const coord = Coord(x, y);

            this.x += coord.x;
            this.y += coord.y;
        },
        add(x, y) {
            const coord = Coord(x, y);

            const position = Position(this.get());

            position.move(coord);

            return position
        },
        subtract(x, y) {
            const coord = Coord(x, y);

            return Position(this.x - coord.x, this.y - coord.y);
        },
        multiplyScalar(scalar) {
            return Position(this.x * scalar, this.y * scalar);
        },
        new() {
            return Position(this.get());
        },
        diff(x, y) {
            const coord = Coord(x, y);

            return this.subtract(x, y).multiplyScalar(-1);
        },
        diffReverse(x, y) {
        },
        reflection(x, y) {
            const coord = Coord(x, y);

            const diff = this.diff(coord);
            return this.add(Coord(diff.x * 2, diff.y * 2));
        },
        get() {
            return {
                x: this.x,
                y: this.y
            }
        },
        toArray() {
            return [this.x, this.y];
        }
    }

    return position
}

export default Position;
