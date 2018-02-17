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
            .style("font-family", "Sans-serif")
            .style("font-size", 14)
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

canvas.append("g")
    .attr("transform","translate(290,490)")
    .append("text")
    .attr("fill","#d0d0d0")
    .style("font-size", "180px")
    .style("font-family","Sans-serif")
    .text("Temperature");

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
        .attr('stroke-width', 1)
        .attr('stroke', "#e2e2e2");

d3.csv("222.csv", function (data2) {
    var line = d3.line()
        .x(function (d) { return (d.LONT-23) * 100})
        .y(function (d) { return -d.TEMP * 10});

    canvas.append("g")
        .attr("transform","translate(5, 300)")
        .selectAll("path")
        .data([data2])
        .enter()
            .append("path")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 4)
            .attr("stroke-linecap", "round");

    canvas.append("g")
        .attr("transform","translate(105,0)")
        .selectAll("line")
        .data(data2)
        .enter()
            .append("line")
            .attr("x1",function(d){ return (d.LONT - 24) * 100; })
            .attr("y1",function(d){ return (60 - d.YLOC) * 100 - 400;})
            .attr("x2",function(d){ return (d.LONT - 24) * 100; })
            .attr("y2",function(d){ return -d.TEMP * 10 + 300;})
            .attr("stroke","#656565")
            .attr("stroke-width","1")
            .style("stroke-dasharray",("3,3"));

    canvas.append("g")
        .attr("transform","translate(5, 300)")
        .selectAll("text")
        .data(data2)
        .enter()
            .append("text")
            .attr("x", function (d) { return (d.LONT-23) * 100 - 20; })
            .attr("y", function (d) { return -d.TEMP * 10 ; })
            .append("tspan")
            .attr("x", function (d) { return (d.LONT-23) * 100 - 20 + 4; })
            .text(function (d) { return d.TEMP + "℃" })
            .append("tspan")
            .attr("x", function (d) { return (d.LONT-23) * 100 - 20; })
            .attr("dy","1em")
            .text(function (d) { return d.MON + " " + d.DAY;})
            .attr("fill","#000000")
            .style("font-size", "15px")
            .style("font-family","Sans-serif");
});