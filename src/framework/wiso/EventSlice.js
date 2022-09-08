import Component from "../canvas/Component";
import MousePosition from "../canvas/MousePosition";
import Events from "../constants/Events";
import SortedDoubleLinkedList from "../SortedDoubleLinkedList";

const listeners = {};

for (const key in Events) {
    listeners[Events[key]] = [];
}

const getIndex = (item) => {
    const newValue = item.index() + '';

    if (item.parent()) {
        return getIndex(item.parent()) + newValue;
    }

    return newValue;
}

const fireEvent = (event, originalEvent, ...data) => {

    const listenerBag = listeners[event];

    if (originalEvent instanceof PointerEvent) {
        console.log(originalEvent);
    }
    if (listenerBag === undefined) {
        throw new Error('Attempting to fire unknown event ' + event);
    }

    let listenersToCall = SortedDoubleLinkedList(listener => getIndex(listener.item));

    let worldEventListeners = [];

    listenerBag.forEach(listener => {
        if (listener.item) {
            if (wiso.isItemTargeted(listener.item, MousePosition(originalEvent))) {
                listenersToCall.push(listener);
            }
        } else {
            worldEventListeners.push(listener);
        }

    })

    let current = listenersToCall.tail();
    let bubble = true;

    while (current) {
        const listener = current.value();

        console.log(event, listener.item.id());
        let result = listener.callback(...data, originalEvent);

        if (typeof result !== "object") {
            result = {
                bubble: !!(result === undefined ? true : result),
            }
        }

        const config = {
            bubble: true,
            ...result,
        }


        bubble = config.bubble;

        if (!bubble) {
            break;
        }

        current = current.previous();
    }

    if (bubble && worldEventListeners) {
        worldEventListeners.forEach(listener => {
            listener.callback(...data, originalEvent)
        })
    }
}

const mapEvents = (canvas) => {

    const bind = (originalEvent, event) => {
        canvas.addEventListener(originalEvent, e => {
            e.preventDefault();
            e.stopPropagation();

            fireEvent(event, e, MousePosition(e));
        })
    }

    bind('click', Events.CLICK);
    bind('dblclick', Events.DOUBLE_CLICK);
    bind('mouseup', Events.MOUSE_UP);
    bind('mousedown', Events.MOUSE_DOWN);
    bind('mousemove', Events.MOUSE_MOVE);
    bind('contextmenu', Events.RIGHT_CLICK);
    bind('mousedown', Events.MOUSE_DOWN);

    canvas.addEventListener('dragover', e => {
        e.preventDefault();
        e.stopPropagation();
        // e.dataTransfer.dropEffect = 'copy';

        console.log(e);
    });

    canvas.addEventListener('drop', e => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e);


        const types = e.dataTransfer.types;
        const items = e.dataTransfer.items;

        console.log(types);
        console.log(items);

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const type = types[i];

            switch (type) {
                case 'text/plain':
                    item.getAsString(data => {
                        console.log('text', data);

                        // wiso.push(Component({
                        //     text: data
                        // }));
                    })
                    break;
                case 'Files':
                    createImageBitmap(item.getAsFile())
                    .then(imageBitmap => {

                        wiso.push(Component({
                            bitmap: imageBitmap,
                            width: imageBitmap.width,
                            height: imageBitmap.height
                        }))

                        // wiso.context.drawImage(imageBitmap, 100, 100, 200, 200, 50, 50, 100, 100);
                    })

                    console.log('file',);
                    break;
                case 'text/html':
                    break;
                case 'text/uri-list':
                    item.getAsString(data => {
                        console.log('uri list', data)
                    })

                    break;
                default:
                    console.warn('Unknown type: ' + type);
            }

        }
    })
    canvas.addEventListener('wheel', e => {
        fireEvent(Events.SCROLL, e);
    }, { passive: false });

    document.addEventListener('keypress', e => {
        fireEvent(Events.KEY, e);
    })

    document.addEventListener('mousemove', e => {
        fireEvent(Events.MOUSE_MOVE, e);
    })
}

const EventSlice = (canvas) => {
    mapEvents(canvas);

    return {
        listen(event, callback, item) {
            const listenerBag = listeners[event];

            if (listenerBag === undefined) {
                throw new Error('Unknown event ' + event);
            }

            listenerBag.push({
                item,
                callback,
            })
        },
        deafen(event, callback, item) {
            if (event === Events.ALL) {
                for (const e in listeners) {
                    const listenerBag = listeners[e];
                    let index = null;

                    listenerBag.forEach((listener, index) => {
                        if (listener.item === item) {
                            if (!callback || callback === listener.callback) {
                                listenerBag.splice(index, 1);
                            }
                        }
                    });
                }
            } else {
                const listenerBag = listeners[event];

                if (listenerBag === undefined) {
                    throw new Error('Unknown event ' + event);
                }

                let index = null;

                listenerBag.forEach((listener, index) => {
                    if (listener.item === item) {
                        if (!callback || callback === listener.callback) {
                            listenerBag.splice(index, 1);
                        }
                    }
                });
            }
        }
    }
}

export default EventSlice;
