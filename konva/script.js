var width = window.innerWidth;
var height = window.innerHeight;

const STROKE_GREY = 'rgba(196,196,196,0.1)';

const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

const orbits = [];
const lines = [];
const successors = [];
const deputies = [];
const deputiesConnectors = [];

const CENTER = {
    x: stage.width() / 2,
    y: stage.height() / 2
};
const ORBITAL_GAP = 70;
const ORBITS_NUMBER = 5;
const INITIAL_RADIUS = ORBITAL_GAP * 2;

const layer = new Konva.Layer();

const circle = new Konva.Circle({
    x: CENTER.x,
    y: CENTER.y,
    radius: 50,
    fill: '#C4C4C4',
    stroke: STROKE_GREY,
    strokeWidth: 4
});

const data = [
    {
        name: 'Греф',
        subtitle: '',
        childrenGroup: [
            {
                childrenGroup: [
                    {
                        name: 'Чупина',
                        subtitle: '',
                        children: []
                    },
                    {
                        name: 'Рафаловский',
                        subtitle: '',
                        children: []
                    },
                    {
                        name: 'Рафаловский',
                        subtitle: '',
                        children: []
                    },
                    {
                        name: 'Рафаловский',
                        subtitle: '',
                        children: []
                    },
                    {
                        name: 'Рафаловский',
                        subtitle: '',
                        children: []
                    }
                ]
            },
            {
                name: 'Ведяхин',
                subtitle: '',
                childrenGroup: [
                    {
                        name: 'Греф',
                        subtitle: '',
                        children: []
                    },
                    {
                        name: 'Греф',
                        subtitle: '',
                        children: []
                    },
                    {
                        name: 'Греф',
                        subtitle: '',
                        children: []
                    },
                    {
                        name: 'Греф',
                        subtitle: '',
                        children: []
                    },
                    {
                        name: 'Греф',
                        subtitle: '',
                        children: []
                    },
                ]
            },
            {
                name: 'Хасис',
                subtitle: '',
                childrenGroup: [
                    {
                        name: 'Греф',
                        subtitle: '',
                        children: []
                    },
                    {
                        name: 'Греф',
                        subtitle: '',
                        children: []
                    },
                    {
                        name: 'Греф',
                        subtitle: '',
                        children: []
                    }
                ]
            },
        ]
    }
];

// Орбиты
for (let i = 0; i < ORBITS_NUMBER; i++) {
    let orbitItem = new Konva.Circle({
        x: CENTER.x,
        y: CENTER.y,
        radius: INITIAL_RADIUS + ORBITAL_GAP * i,
        fill: 'white',
        stroke: STROKE_GREY,
        strokeWidth: 4
    });
    orbits.unshift(orbitItem);
}

// Линии из центра
for (let i = 0; i < 40; i++) {
    let points = getPoint(ORBITAL_GAP * (ORBITS_NUMBER + 1), 360 / 40 * i);
    let line = new Konva.Line({
        x: CENTER.x,
        y: CENTER.y,
        points: [0, 0, points.x, points.y],
        stroke: STROKE_GREY,
        strokeWidth: 2,
        tension: 0
    });
    lines.push(line);
}

// Внешний круг менеджмента
for (let i = 0; i < 13; i++) {
    let points = getPoint(ORBITAL_GAP * (ORBITS_NUMBER + 1), 360 / 13 * i);

    let successor = new Konva.Circle({
        x: CENTER.x + points.x,
        y: CENTER.y + points.y,
        radius: 50,
        fill: '#C4C4C4',
        stroke: STROKE_GREY,
        strokeWidth: 1
    })
    successors.push(successor);
}

// Ассистенты
for (let i = 0; i < 2; i++) {
    let points = getPoint(ORBITAL_GAP * 3, 360 / 3 * i);

    let deputy = new Konva.Circle({
        x: CENTER.x + points.x,
        y: CENTER.y + points.y,
        radius: 50,
        fill: '#C4C4C4',
        stroke: STROKE_GREY,
        strokeWidth: 1
    });

    let line = new Konva.Line({
        x: CENTER.x,
        y: CENTER.y,
        points: [0, 0, points.x, points.y],
        stroke: 'black',
        strokeWidth: 2,
        tension: 0
    });
    deputies.push(line, deputy);
}

// let points = getPoint(ORBITAL_GAP * (ORBITS_NUMBER + 1), 360 / 40 * i);
deputies.forEach(deputy => {

});

// Добавляем фигуры в слой
orbits.forEach(item => layer.add(item));
lines.forEach(item => layer.add(item));
successors.forEach(item => layer.add(item));
deputies.forEach(item => layer.add(item));
layer.add(circle);

// add the layer to the stage
stage.add(layer);
function getPoint(rad, rotation) {

    // var mx = x,
    //     my = y,
    let angle = Math.PI * 2 / 360 * rotation;

    let ax = rad * Math.cos(angle);
    let ay = rad * Math.sin(angle);

    return {
        x: ax,
        y: ay
    }
}
