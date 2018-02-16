var canvas = d3.select("body")
    .append("svg")
    .attr("width", 2000)
    .attr("height", 2000);

d3.csv("333.csv", function (data3) {
    function color(n, l) {
        if (n === "1") {return l === "A" ? "#3b7adf" : "#00cfef";}
        else if (n === "2") {return l === "A" ? "#be611f" : "#ffb312"}
        else if (n === "3") {return l === "A" ? "#109618" : "#10ec00"}
    }

    var lines = canvas
        .append("g")
        .selectAll("line")
        .data(data3)
        .enter()
            .append("line")
            .attr("x1", function (d) {return (d.LONPS - 23) * 100})
            .attr("y1", function (d) {return (60 - d.LATPS) * 100 - 400})
            .attr("x2", function (d) {return (d.LONPE - 23) * 100})
            .attr("y2", function (d) {return (60 - d.LATPE) * 100 - 400})
            .attr("stroke", function (d) {return color(d.DIV, d.DIR)})
            .attr("stroke-width", function (d) {return d.SURV / 6000})
            .attr("stroke-linecap", "round");
});

d3.csv("111.csv", function (data1) {
    var circles = canvas.append("g")
        .selectAll("circle")
        .data(data1)
        .enter()
            .append("circle")
            .attr("cx", function (d) {return (d.LONC - 23) * 100 + 5;})
            .attr("cy", function (d) {return (60 - d.LATC) * 100 - 400;})
            .attr("r", 5);

    var texts = canvas.append("g")
        .selectAll("text")
        .data(data1)
        .enter()
            .append("text")
            .attr("fill", "black")
            .attr("x", function (d) {return (d.LONC - 23) * 100 + 10;})
            .attr("y", function (d) {return (60 - d.LATC) * 100 + 5 - 400;})
            .text(function (d) {return d.CITY;});
});

var scale = d3.scaleLinear()
    .domain([-30, 0])
    .range([300, 0]);

var y_axis = d3.axisRight()
    .ticks(6)
    .scale(scale);

canvas.append("g")
    .attr("transform", "translate(1470,300)")
    .call(y_axis);

line_data = [
    {p: [{x: 0, y: 0}, {x: 1365, y: 0}]},
    {p: [{x: 0, y: 50}, {x: 1365, y: 50}]},
    {p: [{x: 0, y: 100}, {x: 1365, y: 100}]},
    {p: [{x: 0, y: 150}, {x: 1365, y: 150}]},
    {p: [{x: 0, y: 200}, {x: 1365, y: 200}]},
    {p: [{x: 0, y: 250}, {x: 1365, y: 250}]},
    {p: [{x: 0, y: 300}, {x: 1365, y: 300}]}
];

var line = d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

canvas.append("g")
    .attr("transform", "translate(105,300)")
    .selectAll('path')
    .data(line_data)
    .enter()
        .append('path')
        .attr('d', function(d) { return line(d.p); })
        .attr('stroke-width', 0.5)
        .attr('stroke', "#a9a9a9");

d3.csv("222.csv", function (data2) {
    var line = d3.line()
        .x(function (d) { return (d.LONT-23) * 100})
        .y(function (d) { return -d.TEMP * 10});

    canvas.append("g")
        .attr("transform","translate(0, 300)")
        .selectAll("path")
        .data([data2])
        .enter()
            .append("path")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 2);
});