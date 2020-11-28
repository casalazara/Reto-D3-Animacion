import React, {useEffect} from "react";
import * as d3 from "d3";

export default function Grafica() {
  const data = [
    { name: "Medellín", index2005: 3, index2006: 33 },
    { name: "Cali", index2005: 39, index2006: 45 },
    { name: "Bogotá", index2005: 7, index2006: 31 },
    { name: "Pereira", index2005: 35, index2006: 36 },
    { name: "Bucaramanga", index2005: 16, index2006: 23 },
    { name: "Cúcuta", index2005: 45, index2006: 45 },
    { name: "Armenia", index2005: 6, index2006: 16 },
  ];

  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select("#canvas")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().range([0, width]).padding(0.2);
    var xAxis = svg
      .append("g")
      .attr("transform", "translate(0," + height + ")");

    var y = d3.scaleLinear().range([height, 0]);
    var yAxis = svg.append("g").attr("class", "myYaxis");

    d3.select("#start").on("click", function () {
      x.domain(
        data.map(function (d) {
          return d.name;
        })
      );
      xAxis.call(d3.axisBottom(x));

      y.domain([
        0,
        d3.max(data, function (d) {
          return d.index2005;
        }),
      ]);
      yAxis.transition().duration(1000).call(d3.axisLeft(y));

      var u = svg.selectAll("rect").data(data);

      u.enter()
        .append("rect") 
        .merge(u) 
        .transition()
        .duration(1000)
        .attr("x", function (d) {
          return x(d.name);
        })
        .attr("y", function (d) {
          return y(d.index2005);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.index2005);
        })
        .attr("fill", "red")
      u.exit().remove();
    });

    d3.select("#reset").on("click", function () {
      x.domain(
        data.map(function (d) {
          return d.name;
        })
      );
      xAxis.call(d3.axisBottom(x));

      y.domain([
        0,
        d3.max(data, function (d) {
          return d.index2006;
        }),
      ]);
      
      yAxis.transition().duration(1000).call(d3.axisLeft(y));

      var u = svg.selectAll("rect").data(data);

      u.enter()
        .append("rect") 
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function (d) {
          return x(d.name);
        })
        .attr("y", function (d) {
          return y(d.index2006);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.index2006);
        })
        .on("end", function () {
          d3.select(this).transition().attr("fill", "blue");
        });

      u.exit().remove();
    });
  }, []);

  return (
    <div class="container">
      <h1>Reto 1</h1>
      <div>
        <button className="btn-grap" id="start">
          2005
        </button>
        <button className="btn-grap" id="reset">
          2006
        </button>
      </div>
      <div id="canvas"></div>
    </div>
  );
}