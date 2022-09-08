import Component from "../../../framework/canvas/Component";
import MousePosition from "../../../framework/canvas/MousePosition";
import Position from "../../../framework/canvas/Position";
import Colors from "../../../framework/constants/Colors";
import Events from "../../../framework/constants/Events";
import FloatPositions from "../../../framework/constants/FloatPositions";
import FloatTypes from "../../../framework/constants/FloatTypes";
import ContextMenuItem from "./ContextMenuItem";

const ContextMenu = (wiso) => {
    const component = Component({
        id: 'contextMenu',
        hidden: true,
        float: FloatTypes.ABSOLUTE,
        strokeColor: Colors.ORANGE,
        stroke: true,
        color: Colors.WHITE,
        width: 100,
        height: 100,
        zoomable: false,
        position: Position(100, 100),
        index: 999,
    });

    const i = ContextMenuItem({
        id: 'tl'
    });
    const i2 = ContextMenuItem({
        id: 'tr',
        floatPosition: FloatPositions.TOPRIGHT,
        text: 'ok',
        color: Colors.RED,
    });
    const i3 = ContextMenuItem({
        id: 'bl',
        floatPosition: FloatPositions.BOTTOMLEFT,
        text: 'merg',
    });
    const i4 = ContextMenuItem({
        id: 'br',
        floatPosition: FloatPositions.BOTTOMRIGHT,
        text: 'ok',
    });


    component.push(i);
    component.push(i2);
    component.push(i3);
    component.push(i4);

    wiso.push(component)

    wiso.listen(Events.CLICK, (mousePosition) => {
        console.log('asd');
    }, component);
    wiso.listen(Events.CLICK, (mousePosition) => {
        console.log('qwe');
        let pos = component.position();
        pos = pos.subtract(wiso.renderWidth() / 2, wiso.renderHeight() / 2);
        pos = pos.subtract(wiso.offsetPosition().multiplyScalar(wiso.zoom()));
        pos = pos.multiplyScalar(1/wiso.zoom());

        wiso.push(Component({
            width: 300,
            height: 300,
            color: Colors.ORANGE,
            position: pos
        }));

        hide();
        return false;
    }, i);

    wiso.listen(Events.MOUSE_MOVE, (mousePosition) => {
        if (wiso.isItemTargeted(i, mousePosition)) {
            if (i.color() !== Colors.ORANGE) {
                i.setColor(Colors.ORANGE);
            }
        
        } else {
            if (i.color() !== Colors.NICE_BLUE) {
                i.setColor(Colors.NICE_BLUE);
            }
        }
    });

    const hide = (mousePos) => {
        component.setHidden(true);
        wiso.deafen(Events.CLICK, hide)
    }

    wiso.listen(Events.RIGHT_CLICK, (mousePosition, e) => {
        component.setPosition(mousePosition);
        component.setHidden(false);

        wiso.listen(Events.CLICK, hide);
    })
}

export default ContextMenu;
