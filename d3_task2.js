d3.csv("333.csv", function (data3) {
    var canvas = d3.select("body")
            .append("svg")
            .attr("width", 2000)
            .attr("height", 2000);

    // var line = d3.svg.line()
    //     .x(function (d) {
    //         return (d.LONPS - 24)*100;
    //     })
    //     .y(function (d) {
    //         return (60-d.LATPS)*100-400;
    //     });
    color = d3.scale.category10().domain([1,10]);
    function colores(n, l) {
        console.log(n,l);
        if ( n === "1" ){ return l === "A" ? "#2a50a0" : "#00cfef"; }
        else if ( n ==="2" ) { return l === "A"? "#cb3512" : "#ffb000"}
        else if ( n === "3" ) { return l === "A"? "#109618":"#02ec6a"}


        // return colores_g[n % colores_g.length];
    }
    // widthScale = d3.scale.linear().domain([0,340000]).range([1,37]);
    // var lineGraph = canvas.append("path")
    //         .attr("d",line(data3))
    //         .attr("fill","none")
    //         .attr("stroke","yellow")
    //         .attr("stroke-width","10");

    var lines = canvas.selectAll("line")
        .data(data3)
        .enter()
            .append("line")
            .attr("x1", function (d) { return (d.LONPS- 23)*100 })
            .attr("y1", function (d) { return (60-d.LATPS)*100-400 })
            .attr("x2", function (d) { return (d.LONPE- 23)*100 })
            .attr("y2", function (d) { return (60-d.LATPE)*100-400 })
            .attr("stroke", function (d) {
                console.log(colores(d.DIV,d.DIR));
                return colores(d.DIV,d.DIR)})
            .attr("stroke-width",function (d) { return d.SURV/6000})
            .attr("stroke-linecap","round");
    d3.csv("111.csv", function (data1) {
        canvas.selectAll("circle")
            .data(data1)
            .enter()
                .append("circle")
                .attr("cx", function (d, i) {
                    return (data1[i].LONC - 23) * 100 + 5;
                })
                .attr("cy", function (d, i) {
                    return (60 - data1[i].LATC) * 100 - 400;
                })
                .attr("r", 5);

        canvas.selectAll("text")
            .data(data1)
            .enter()
                .append("text")
                .attr("fill", "black")
                .attr("x", function (d, i) {
                    return (data1[i].LONC - 23) * 100 + 10;
                })
                .attr("y", function (d, i) {
                    return (60 - data1[i].LATC) * 100 + 5 - 400;
                })
                .text(function (d) {
                    return d.CITY;
                });
    });

});
