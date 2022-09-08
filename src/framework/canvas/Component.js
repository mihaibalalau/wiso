import Events from "../constants/Events";
import Wiso from "../Wiso";
import Position from "./Position";
import TreeSlice from "./component/TreeSlice";
import LayoutSlice from "./component/LayoutSlice";
import PositionSlice from "./component/PositionSlice";
import BackupSlice from "./component/BackupSlice";
import RenderSlice from "./component/RenderSlice";
import FloatPositions from "../constants/FloatPositions";
import FloatTypes from "../constants/FloatTypes";
import Colors from "../constants/Colors";
import TextSlice from "./component/TextSlice";
import IndexSlice from "./component/IndexSlice";
import ImageSlice from "./component/ImageSlice";


const buildFocusHandler = (item) => {
    return () => {
        let target = item;

        while (target.isComponent()) {
            return false;
        }
        while (target.isChild() && Wiso().getFocusedItem() !== target.parent()) {
            target = target.parent();
        }
        Wiso().focus(target);
    }
}

const defaultConfig = {
    width: 0,
    height: 0,
    color: Colors.BLANK,
    strokeColor: Colors.BLACK,
    fill: true,
    stroke: true,
    children: [],
    float: FloatTypes.RELATIVE,
    floatPosition: FloatPositions.CENTER,
    position: Position(0, 0),
    zoomable: true,
    hidden: false,}

const defaultTextConfig = {
    lineHeight: null,
    fontSize: 14,
    fontFamily: 'sans-serif',
    fontStyle: '',
    fontColor: Colors.BLACK,
    fontFill: true,
    fontStroke: false,
    padding: 10,
    multiLine: true,
    overflow: true,
}

let currentId = 0;

const Component = (config = {}) => {
    const id = config.id ?? currentId++;

    config = {
        ...defaultConfig,
        ...(config.text ? defaultTextConfig : {}),
        ...config,
    };

    const component = {
        ...TreeSlice(),
        ...LayoutSlice(),
        ...PositionSlice(),
        ...RenderSlice(config),
        ...IndexSlice(config),
        ...BackupSlice(),
        id() {
            return id
        },
        ...(config.text ? TextSlice(config) : {}),
        ...(config.bitmap ? ImageSlice(config) : {}),
    }

    component.restoreState(config);

    return component;
}

export default Component;
