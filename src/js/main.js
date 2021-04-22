"use strict";

/* Get or create the application global variable */
var App = App || {};

/* IIFE to initialize the main entry of the application*/
(function() {

    // setup the pointer to the scope 'this' variable
    var self = this;

    /* Entry point of the application */
    App.start = function()
        {
            var margin = {top: 20, right: 0, bottom: 50, left: 85},
            svg_dx = 500, 
            svg_dy = 400,
            plot_dx = svg_dx - margin.right - margin.left,
            plot_dy = svg_dy - margin.top - margin.bottom;

            var x = d3.scaleLinear().range([margin.left, plot_dx]),
            y = d3.scaleLinear().range([plot_dy, margin.top]);

            var formatdate = d3.timeFormat("%x"),
            formatpolarity = d3.format(",.2f"),
            formatHsGradAxis = d3.format(".0%");

            var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", svg_dx)
                    .attr("height", svg_dy);

            d3.csv("../../data/parsed_rows_SaveOurStages.csv", d => {

            var n = d.length;

            var d_extent_x = d3.extent(d, d => +d.date),
                d_extent_y = d3.extent(d, d => +d.polarity);

            x.domain(d_extent_x);
            y.domain(d_extent_y);

            var axis_x = d3.axisBottom(x)
                        .tickFormat(formatdate),
                axis_y = d3.axisLeft(y)
                        .tickFormat(formatpolarity);

            svg.append("g")
            .attr("id", "axis_x")
            .attr("transform", "translate(0," + (plot_dy + margin.bottom / 2) + ")")
            .call(axis_x);

            svg.append("g")
            .attr("id", "axis_y")
            .attr("transform", "translate(" + (margin.left / 2) + ", 0)")
            .call(axis_y);

            d3.select("#axis_x")
            .append("text")
            .attr("transform", "translate(360, -10)")
            .text("Date");

            d3.select("#axis_y")
            .append("text")
            .attr("transform", "rotate(-90) translate(-20, 15)")
            .text("Sentiment Polarity");

            var circles = svg.append("g")
                            .selectAll("circle")
                            .data(d)
                            .enter()
                            .append("circle")
                            .attr("r", 5)
                            .attr("cx", (d) => x(+d.date))
                            .attr("cy", (d) => y(+d.polarity))
                            .attr("class", "non_brushed");
            });
        }
    }) ();
