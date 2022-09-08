import MousePosition from "../../framework/canvas/MousePosition";

const DragProvider = (wiso, mainCanvas) => {

    let initialMousePosition;
    let initialOffsetPosition;
    
    const dragStart = (e) => {
        initialMousePosition = MousePosition(e);
        initialOffsetPosition = wiso.offsetPosition().add(0, 0);
    
        e.target.addEventListener('mousemove', drag)
        e.target.addEventListener('mouseup', drop)
    }
    
    const drag = (e) => {
        const currentMousePosition = MousePosition(e);
        const mousePositionDiff = currentMousePosition.subtract(initialMousePosition);
        const diffScaledToZoom = mousePositionDiff.multiplyScalar(1 / wiso.zoom())
    
        wiso.setOffsetPosition(initialOffsetPosition.add(diffScaledToZoom));
    }
    
    const drop = (e) => {
        e.target.removeEventListener('mousemove', drag);
        e.target.removeEventListener('mouseup', drop);
    }
    
    mainCanvas.addEventListener('mousedown', e => {
        e.preventDefault();
        e.stopPropagation();
        dragStart(e, mainCanvas);
    });

};

export default DragProvider;
