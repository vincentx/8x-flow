import merge from "lodash-es/merge";

export default function (chart, relationships, config) {
    return chart
        .append("g")
        .selectAll("line")
        .data(relationships)
        .join("line")
        .attr("stroke", (_) => findConfig(_, config).color)
        .attr("stroke-width", (_) => findConfig(_, config).width)
        .attr("stroke-opacity", (_) => findConfig(_, config).opacity)
        .attr("stroke-dasharray", (_) => findConfig(_, config).dash);
}

function findConfig(rel, config) {
    return merge({}, config.relationships.defaults, config.relationships[rel.type] || {});
}