
import WisoAnimation from "../framework/animation/Animation";
import Component from "../framework/canvas/Component";
import Position from "../framework/canvas/Position";
import Colors from "../framework/constants/Colors";
import Events from "../framework/constants/Events";
import Wiso, { initWiso } from "../framework/Wiso"
import ContextMenu from "./components/contextmenu/ContextMenu";
import CommandProvider from "./providers/CommandProvider";
import DragProvider from "./providers/DragProvider";
import ZoomProvider from "./providers/ZoomProvider";


const mainCanvas = document.getElementById('main');
mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight;

const wiso = initWiso(mainCanvas, {
    zoomable: true
});

ContextMenu(wiso);

wiso.render();

ZoomProvider(wiso);
DragProvider(wiso, mainCanvas);
CommandProvider(wiso, mainCanvas);

const rand = (min, max) => {
    const r = Math.random();
    const range = max - min;

    return r * range + min;
}

wiso.listen(Events.KEY, () => {
    const p = Position(rand(-600, 600), rand(-600, 600));
    console.log(p);

    wiso.push(Component({
        color: Colors.RED_TRANSPARENT,
        position: p,
        width: 100,
        height: 100,
    }))
})

setInterval(() => {
    wiso.refresh()
}, 17)

// const autoRefresh = WisoAnimation(() => {
//     wiso.refresh();
// });

// autoRefresh.play();


export default {};
