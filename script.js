// var canvas = oCanvas.create({
//     canvas: "#canvas",
//     background: "#222",
//     fps: 60
// });
//
// const SUCCESSORS_ORBIT_RADIUS = 240;
// const DEPUTY_COUNT = 2;
// const DEPUTY_ORBIT_RADIUS = 140;
// const SUCCESSORS_COUNT = 13;
//
// // Президент банка
// var center = canvas.display.ellipse({
//     x: canvas.width / 2, y: canvas.height / 2,
//     radius: canvas.width / 20,
//     fill: "#fff"
// }).add();
//
// // Prototype objects that will be used to instantiate the others
// var satelliteProto = canvas.display.ellipse({fill: "#eee"});
// var pathProto = canvas.display.ellipse({stroke: "1px #999"});
// const lineProto = canvas.display.line({stroke: "2px #0aa", cap: "round"});
//
// // Set up data
// var satellites = [],
//     connectors = [],
//     depth = 3;
// var satelliteColors = ["#107B99", "#5F92C0", "#c7509f"];
// var pathColors = ["#666", "#107B99", "#5F92C0"];
//
// // Отрисиовка кадровой комиссии
// for (let i = 0; i < SUCCESSORS_COUNT; i++) {
//     let options = {
//         parent: center, depth: 1,
//         distance: (i) * canvas.width / 5,
//         radius: canvas.width / 100,
//         speed: 1,
//         orbitRadius: SUCCESSORS_ORBIT_RADIUS,
//         numberOfNodes: SUCCESSORS_COUNT,
//         order: i + 1
//     };
//
//     // Создание общей орбиты
//     const path = pathProto.clone({
//         radius: SUCCESSORS_ORBIT_RADIUS,
//         x: options.x || 0, y: options.y || 0,
//         strokeColor: pathColors[options.depth - 1]
//     });
//     options.parent.addChild(path);
//
//     // Наполнение орбиты
//     createChartNode(options);
// }
//
// // Отрисиовка кадровой комиссии
// for (let i = 0; i < DEPUTY_COUNT; i++) {
//     let options = {
//         parent: center, depth: 1,
//         distance: (i) * canvas.width / 5,
//         radius: canvas.width / 100,
//         speed: 1,
//         orbitRadius: DEPUTY_ORBIT_RADIUS,
//         numberOfNodes: DEPUTY_COUNT,
//         order: i + 1
//     };
//
//     // Создание общей орбиты
//     const path = pathProto.clone({
//         radius: DEPUTY_ORBIT_RADIUS,
//         x: options.x || 0, y: options.y || 0,
//         strokeColor: pathColors[options.depth - 1]
//     });
//     options.parent.addChild(path);
//
//     // Наполнение орбиты
//     createChartNode(options);
// }
//
// // TODO Отрисовка промежуточных линий и орбит
//
// // Создание элементов орбиты
// function createChartNode(options) {
//     const chartNode = satelliteProto.clone({
//         origin: {
//             x: 0, y: options.orbitRadius
//         },
//         radius: options.radius,
//
//         // Смещение от орбиты
//         x: 0, y: 0,
//         fill: satelliteColors[options.depth - 1],
//
//         // Смещение от предыдущего элемента
//         rotation: options.order * 360 / options.numberOfNodes
//     });
//
//     var line = lineProto.clone({
//         start: {
//             x: 0, y: 0
//         },
//         rotation: options.order * 360 / options.numberOfNodes,
//         end: {
//             x: chartNode.origin.x, y: chartNode.origin.y
//         }
//     });
//
//     options.parent.addChild(line);
//     options.parent.addChild(chartNode);
//
//     satellites.push(chartNode);
//     connectors.push(line);
// }
//
// center.children.forEach(item => console.log(item.x, item.y));

const spacetime = d3.select('body'),
    GREY = 'rgba(196,196,196,0.4)',
    width = 960,
    height = 900,
    radius = Math.min(width, height),
    radii = {
        "sun": radius / 10,
        "earthOrbit": radius / 2.5,
        "earth": radius / 25,
    };

function drawRadiuses(amount = 5, startRad = 100) {
    for (let i = 0; i < amount; i++) {
        svg.append("circle")
            .attr("class", "orbit" + i)
            .attr("r", startRad + i * 70)
            .style("fill", "none")
            .style("stroke", GREY)
            .style("stroke-width", "2");
    }
}

// Space
var svg = spacetime.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Sun
svg.append("circle")
    .attr("class", "sun")
    .attr("r", 50)
    .style("stroke", "#f58c2e")
    .style("stroke-width", "10")
    .style("fill", "#f58c2e");

drawRadiuses(5, 150);

function getCirclePoints(points, radius, center) {
    var circlePositions = [];
    var slice = 2 * Math.PI / points;
    for (var i = 0; i < points; i++) {
        var angle = slice * i;
        var newX = (center.X + radius * Math.cos(angle));
        var newY = (center.Y + radius * Math.sin(angle));
        circlePositions.push({
            cx: newX,
            cy: newY
        });
    }
    return circlePositions;
}

const circlePositions = getCirclePoints(12, radii.earthOrbit, {
    X: 0,
    Y: 0
});
const circlePositions2 = getCirclePoints(2, 215, {
    X: 0,
    Y: 0
});

svg.selectAll(".earth").data(circlePositions)
    .enter()
    .append("circle")
    .attr("class", "earth")
    .attr("r", radii.earth)
    .attr("cx", function(d) {
        return d.cx
    })
    .attr("cy", function(d) {
        return d.cy
    })
    .style("stroke", GREY)
    .style("stroke-width", "3")
    .style("fill", "#bababa");

svg.selectAll(".earth1").data(circlePositions2)
    .enter()
    .append("circle")
    .attr("class", "earth1")
    .attr("r", radii.earth)
    .attr("cx", function(d) {
        return d.cx
    })
    .attr("cy", function(d) {
        return d.cy
    })
    .style("stroke", GREY)
    .style("stroke-width", "3")
    .style("fill", "#797979");
