import Wiso from "../Wiso";
import Canvas from "./Canvas";

const MainCanvas = () => {
    const mainCanvas = Canvas();
    mainCanvas.id = 'main';
    mainCanvas.width = window.innerWidth;
    mainCanvas.height = window.innerHeight;

    return mainCanvas
}

export default MainCanvas;
