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

// canvas.append("g")
//     .attr("transform","translate(290,490)")
//     .append("text")
//     .attr("fill","#d0d0d0")
//     .style("font-size", "180px")
//     .style("font-family","Sans-serif")
//     .text("Temperature");

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
            .attr("stroke", "#ff565b")
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
            .attr("fill","#000000")
            .style("font-size", "15px")
            .style("font-family","Sans-serif")
            .append("tspan")
            .attr("x", function (d) { return (d.LONT-23) * 100 - 20; })
            .attr("dy","1.1em")
            .text(function (d) { return d.MON + " " + d.DAY;})
            .attr("fill","#000000")
            .style("font-size", "15px")
            .style("font-family","Sans-serif");
});

lables_data = [
    {p: [{x: 0, y: 0}, {x: 40, y: 0}],w: 5, c:"#3b7adf"},
    {p: [{x: 0, y: 30}, {x: 40, y: 30}],w: 5, c:"#00cfef"},
    {p: [{x: 300, y: 0}, {x: 340, y: 0}], w: 5, c:"#be611f"},
    {p: [{x: 300, y: 30}, {x: 340, y: 30}], w: 5, c:"#ffb312"},
    {p: [{x: 600, y: 0}, {x: 640, y: 0}], w: 5, c:"#109618"},
    {p: [{x: 600, y: 30}, {x: 640, y: 30}], w: 5, c:"#10ec00"},
    {p: [{x: 920, y: 0}, {x: 920, y: 0}], w: 10, c:"black"},
    {p: [{x: 900, y: 30}, {x: 940, y: 30}], w: 4, c:"#ff565b"},

    {p: [{x: 0, y: 90}, {x: 40, y: 90}], w: 50, c:"black"},
    {p: [{x: 300, y: 90}, {x: 340, y: 90}], w: 33.33, c:"black"},
    {p: [{x: 600, y: 90}, {x: 640, y: 90}], w: 16.67, c:"black"},
    {p: [{x: 900, y: 90}, {x: 940, y: 90}], w: 8.33, c:"black"},
    {p: [{x: 0, y: 150}, {x: 40, y: 150}], w: 6.67, c:"black"},
    {p: [{x: 300, y: 150}, {x: 340, y: 150}], w: 5, c:"black"},
    {p: [{x: 600, y: 150}, {x: 640, y: 150}], w: 3.33, c:"black"},
    {p: [{x: 900, y: 150}, {x: 940, y: 150}], w: 1.67, c:"black"}
];

lables_text = [
    {x: 50, y: 5, w: 5, t: "Division: 1 Direction: A"},
    {x: 50, y: 35,w: 5, t: "Division: 1 Direction: R"},
    {x: 350, y: 5, w: 5, t: "Division: 2 Direction: A"},
    {x: 350, y: 35, w: 5,t: "Division: 2 Direction: R"},
    {x: 650, y: 5, w: 5, t: "Division: 3 Direction: A"},
    {x: 650, y: 35, w: 5, t: "Division: 3 Direction: R"},
    {x: 950, y: 5, w: 10, t: "City Name"},
    {x: 950, y: 35, w: 4, t: "Temperature"},

    {x: 70, y: 95, w: 5, t: "Survivors: 300,000"},
    {x: 360, y: 95, w: 5, t: "Survivors: 200,000"},
    {x: 655, y: 95, w: 5, t: "Survivors: 100,000"},
    {x: 950, y: 95, w: 5, t: "Survivors: 50,000"},
    {x: 70, y: 155, w: 5, t: "Survivors: 40,000"},
    {x: 360, y: 155, w: 5, t: "Survivors: 30,000"},
    {x: 655, y: 155, w: 5, t: "Survivors: 20,000"},
    {x: 950, y: 155, w: 5, t: "Survivors: 10,000"}

];

canvas.append("g")
    .attr("transform", "translate(250, 700)")
    .selectAll('path')
    .data(lables_data)
    .enter()
        .append('path')
        .attr('d', function(d) { return line(d.p); })
        .attr("stroke", function (d) { return d.c})
        .attr("stroke-width", function (d) { return d.w})
        .attr("stroke-linecap", "round");

canvas.append("g")
    .attr("transform", "translate(250, 700)")
    .selectAll('text')
    .data(lables_text)
    .enter()
        .append('text')
        .attr("x", function (d) { return d.x })
        .attr("y", function (d) { return d.y })
        .text(function (d) { return d.t })
        .attr("fill","#000000")
        .style("font-size", "15px")
        .style("font-family","Sans-serif");

// canvas.append("g")
//     .attr("transform", "translate(200, 680)")
//     .append("line")
//     .attr("x1", 0)
//     .attr("y1", 0)
//     .attr("x2", 20)
//     .attr("y2", 0)
//     .attr("stroke", "#3b7adf")
//     .attr("stroke-width",10)
//     .attr("stroke-linecap", "round")
//     .append("text")
//     .text("sdadadsa")
//     .attr("fill","#000000")
//     .style("font-size", "15px")
//     .style("font-family","Sans-serif");