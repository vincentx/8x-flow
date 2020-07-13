import {drag} from "d3-drag";
import {event} from "d3-selection";

export function handleDrag(force) {
    return drag()
        .on("start", function (d) {
            if (!event.active) force.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        })
        .on("drag", function (d) {
            d.fx = event.x;
            d.fy = event.y;
        })
        .on("end", function (d) {
            if (!event.active) force.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        });
}

export function handleZoom(presenter) {
    return () => presenter.group.attr("transform", event.transform);
}