import * as d3 from "d3-selection";

export default function (chart, models, config) {
    return chart
        .selectAll("g")
        .data(models)
        .join("g").each(render)
        .attr("class", _ => `model ${_.archetype}`);
}

function render(model) {
    renderBackground(this);
}

function renderBackground(container) {
    d3.select(container)
        .append('rect')
        .attr('class', 'background')
        .attr('width', 400)
        .attr('height', 300)
        .attr('x', 0)
        .attr('y', 0)
        .attr('rx', 10)
        .attr('ry', 10);
}