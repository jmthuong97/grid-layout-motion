export const options = {
    image: {
        translation: {x: -10, y: -10, z: 0},
        rotation: {x: 0, y: 0, z: 0}
    },
    title: {
        translation: {x: 20, y: 10, z: 0}
    },
    text: {
        translation: {x: 20, y: 50, z: 0},
        rotation: {x: 0, y: 0, z: -20}
    },
    deco: {
        translation: {x: -20, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 3}
    },
    shadow: {
        translation: {x: 30, y: 20, z: 0},
        rotation: {x: 0, y: 0, z: -2},
        reverseAnimation: {duration: 2, ease: 'Back.easeOut'}
    },
    content: {
        translation: {x: 5, y: 3, z: 0}
    }
};

export const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {x: posx, y: posy}
};

export const setRange = (obj) => {
    for (let k in obj) {
        if (obj[k] === undefined) {
            obj[k] = [0, 0];
        } else if (typeof obj[k] === 'number') {
            obj[k] = [-1 * obj[k], obj[k]];
        }
    }
};

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const lineEq = (y2, y1, x2, x1, currentVal) => {
    // y = mx + b
    let m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
    return m * currentVal + b;
};