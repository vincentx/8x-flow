import config from "./config";
import merge from "lodash-es/merge";

export default function (chart, relationships, cfg) {
    let c = config(cfg);

    return chart
        .append("g")
        .selectAll("line")
        .data(relationships)
        .join("line")
        .attr("stroke", (_) => findConfig(_, c).color)
        .attr("stroke-width", (_) => findConfig(_, c).width)
        .attr("stroke-opacity", (_) => findConfig(_, c).opacity)
        .attr("stroke-dasharray", (_) => findConfig(_, c).dash);
}

function findConfig(rel, config) {
    return merge(config.relationships.defaults,
        config.relationships[rel.type] || {});
}