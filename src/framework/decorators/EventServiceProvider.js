import Events from "../constants/Events";
import MousePosition from "../canvas/MousePosition";
import Wiso from "../Wiso";

const listeners = {};

for (const key in Events) {
    listeners[Events[key]] = [];
}

const forEachEvent = (callback) => {
    for (const event in listeners) {
        callback(event, listeners[event]);
    }
}

function listen(item, event, callback) {

    if (!callback) {
        callback = event;
        event = item;
        item = Wiso().container;
    }

    const listenerBag = listeners[event];

    if (listenerBag === undefined) {
        throw new Error('Unknown event ' + event);
    }

    listenerBag.push({
        item,
        callback,
    })
};

function deafen(item, event, callback) {
    if (!callback) {
        callback = event;
        event = item;
        item = Wiso().container;
    }

    const listenerBag = listeners[event];

    if (listenerBag === undefined) {
        throw new Error('Unknown event ' + event);
    }

    for (const index in listenerBag) {
        const listener = listenerBag[index];

        if (listener.item === item && listener.callback === callback) {
            listeners[event].splice(index, 1);
        }
    }
}

function deafenAll(item, event = Events.ALL) {
    if (event === Events.ALL) {
        for (const event in listeners) {
            const listenerBag = listeners[event];

            listenerBag.forEach((listener, index) => {
                if (listener.item === item) {
                    listeners[event].splice(index, 1);
                }
            })
        }
    } else {
        const listenerBag = listeners[event];

        listenerBag.forEach((listener, index) => {
            if (listener.item === item) {
                listeners[event].splice(index, 1);
            }
        })
    }
}

const fireEvent = (event, originalEvent, ...data) => {
    let s = Date.now();
    const wiso = Wiso();
    const listenerBag = listeners[event];

    if (listenerBag === undefined) {
        throw new Error('Attempting to fire unknown event ' + event);
    }

    let shouldRender = false;
console.log(event, listenerBag.length)
    listenerBag.forEach(listener => {
        if (wiso.isItemTargeted(listener.item, MousePosition(originalEvent))) {
            const listenerResult = listener.callback(...data, originalEvent);
            if (listenerResult !== false) {
                shouldRender = true;
            }
        }
    })

    if (shouldRender) {
        
        setTimeout(() => {
            wiso.refresh();
        },1);
    }

}

const mapEvents = (canvas) => {
    let initialMousePosition;

    const drag = e => {
        e.preventDefault();
        e.stopPropagation();
        fireEvent('drag', e, initialMousePosition, MousePosition(e).subtract(initialMousePosition));
    }

    const dragEnd = e => {
        e.preventDefault();
        e.stopPropagation();

        canvas.removeEventListener('mousemove', drag);
        canvas.removeEventListener('mouseup', dragEnd);
        const currentMousePosition = MousePosition(e);
        const offset = initialMousePosition.subtract(currentMousePosition);

        fireEvent('dragEnd', e, initialMousePosition, offset);

        if (offset.x === 0 && offset.y === 0) {
            fireEvent('click', e, MousePosition(e));
        }
    }

    canvas.addEventListener('mousedown', e => {
        console.log(MousePosition(e))
        e.preventDefault();
        e.stopPropagation();
        initialMousePosition = MousePosition(e);
        fireEvent('dragStart', e, initialMousePosition);


        canvas.addEventListener('mousemove', drag);
        canvas.addEventListener('mouseup', dragEnd)
    });

    canvas.addEventListener('wheel', e => {
        e.preventDefault();
        e.stopPropagation();

        fireEvent('scroll', e);
    });

    canvas.addEventListener('dblclick', e => {
        e.preventDefault();
        e.stopPropagation();
        fireEvent('doubleClick', e);
    });

    canvas.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.stopPropagation();
        fireEvent('rightClick', e);

        return false;
    })

    canvas.addEventListener('keypress', e => {
        fireEvent('keypress', e);
    })
}

function debounce(callback, time = 100) {
    let timer;

    return e => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(callback, time, e);
    };
}

const bindOwnEvents = (canvas) => {
    const wiso = Wiso();

    window.addEventListener('resize', debounce(e => {
        // console.log('x');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // wiso.refresh();
    }));
}

const decorate = () => {
    const wiso = Wiso();

    wiso.listen = listen;
    wiso.deafen = deafen;
    wiso.deafenAll = deafenAll;
    wiso.getListeners = function () {
        return listeners;
    }
}

const EventServiceProvider = (canvas) => {
    mapEvents(canvas);
    decorate();
    bindOwnEvents(canvas);
};

export default EventServiceProvider;

export { debounce };
