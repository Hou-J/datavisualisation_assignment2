var width = 1000;
var height = 1000;


var widthScale = d3.scale.linear()
    .domain([0, 90])
    .range([0, 700]);

var dataArray = [20, 40, 45, 90];

var axis = d3.svg.axis()
    .scale(widthScale);

var canvas = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

var bars = canvas.selectAll("rect")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("x", 300)
    .attr("width", function (d) {
        return widthScale(d)
    })
    .attr("height", 5)
    .attr("y", function (d, i) {
        return i * 10
    });

canvas.append("g")
    .attr("transform","translate(300,50)")
    .call(axis);

var circle_positions = [300, 350, 400, 450];
var circle_colors = ["red", "green", "blue"];

var circles = canvas.selectAll("circle")
    .data(circle_positions)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return d;
    })
    .attr("cy", function (d) {
        return d;
    })
    .attr("r", 20);

var rect = canvas.append("rect")
    .attr("width", 100)
    .attr("height", 50)
    .attr("x", 100)
    .attr("y", 100)
    .attr("fill", "red")
    .attr("transform", "rotate(30)");

var circle = canvas.append("circle")
    .attr("cx", 150)
    .attr("cy", 50)
    .attr("r", 50)
    .attr("fill", "blue");

var line = canvas.append("line")
    .attr("x1", 65)
    .attr("y1", 185)
    .attr("x2", 150)
    .attr("y2", 50)
    .attr("stroke", "green")
    .attr("stroke-width", 3);
