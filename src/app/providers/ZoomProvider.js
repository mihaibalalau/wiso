import WisoAnimation from "../../framework/animation/Animation";
import MousePosition from "../../framework/canvas/MousePosition";
import Position from "../../framework/canvas/Position";
import Events from "../../framework/constants/Events";
import RangeMap from "../services/RangeMap";


const ZoomProvider = (wiso) => {

    let initialZoom;
    let initialOffset;
    let targetZoom;
    let targetOffset;
    let mousePosition;
    let sign;

    const frameRange = { from: 0, to: 15 }
    const screenCenter = Position(wiso.width() / 2, wiso.height() / 2)

    const scrollAnimation = WisoAnimation((animation) => {
        const currentFrame = animation.currentFrame();

        if (currentFrame >= frameRange.to) {
            wiso.setZoom(targetZoom);
            wiso.setOffsetPosition(targetOffset);

            initialZoom = null;
            initialOffset = null;

            animation.stop();
        } else {

            const newZoom = zoom(initialZoom, sign, RangeMap(frameRange, { from: 0, to: 1 }, currentFrame));
            const newOffset = offset(initialOffset, mousePosition, initialZoom, newZoom);

            wiso.setZoom(newZoom);
            wiso.setOffsetPosition(newOffset);
        }
    });


    wiso.listen(Events.SCROLL, e => {
        e.preventDefault();
        e.stopPropagation();

        sign = e.deltaY < 0 ? 1 : -1;

        const newZoom = zoom(wiso.zoom(), sign);

        const newOffset = offset(wiso.offsetPosition(), MousePosition(e), wiso.zoom(), newZoom);

        initialZoom = wiso.zoom();
        initialOffset = wiso.offsetPosition();

        mousePosition = MousePosition(e);
        targetZoom = newZoom;
        targetOffset = newOffset;

        scrollAnimation.reset();
        scrollAnimation.play();

    })


    const zoom = (initialZoom, sign, multiplier = 1) => {
        const newZoom = parseFloat(parseFloat(initialZoom + initialZoom * sign * .2 * multiplier || .1).toFixed(4));

        if (newZoom < wiso.minZoom()) {
            return wiso.minZoom()
        } 

        if (newZoom > wiso.maxZoom()) {
            return wiso.maxZoom()
        }

        return newZoom;
    }

    const offset = (initial, mousePos, initialZoom, newZoom) => {
        const offsetScale = (newZoom - initialZoom) / (newZoom * initialZoom);

        const diff = mousePos.diff(screenCenter).multiplyScalar(offsetScale);

        return initial.add(diff);
    }
}


export default ZoomProvider;

