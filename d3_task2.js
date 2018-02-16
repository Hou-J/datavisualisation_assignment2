var canvas = d3.select("body")
    .append("svg")
    .attr("width", 2000)
    .attr("height", 2000);

d3.csv("333.csv", function (data3) {
    function color(n, l) {
        if (n === "1") {return l === "A" ? "#2a50a0" : "#00cfef";}
        else if (n === "2") {return l === "A" ? "#cb3512" : "#ffb000"}
        else if (n === "3") {return l === "A" ? "#109618" : "#02ec6a"}
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
    canvas.append("g")
        .selectAll("circle")
        .data(data1)
        .enter()
            .append("circle")
            .attr("cx", function (d) {return (d.LONC - 23) * 100 + 5;})
            .attr("cy", function (d) {return (60 - d.LATC) * 100 - 400;})
            .attr("r", 5);

    canvas.append("g")
        .selectAll("text")
        .data(data1)
        .enter()
            .append("text")
            .attr("fill", "black")
            .attr("x", function (d) {return (d.LONC - 23) * 100 + 10;})
            .attr("y", function (d) {return (60 - d.LATC) * 100 + 5 - 400;})
            .text(function (d) {return d.CITY;});
});

d3.csv("222.csv", function (data2) {

});