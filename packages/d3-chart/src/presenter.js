import config from "./config";
import model from "./model";
import relationship from './relationship';
import merge from "lodash/merge";

export default function (container, data, opts) {
    let options = config(opts);

    let svg = container.append("svg").attr("viewBox", [0, 0, options.view.width, options.view.height]);
    let links = relationship(svg, data.relationships, options);
    let nodes = model(svg, data.models, options);

    return {
        svg: svg,
        nodes: nodes,
        links: links,
        options: options,

        tick: function () {
            links.attr("x1", _ => _.source.x).attr("y1", _ => _.source.y)
                .attr("x2", _ => _.target.x).attr("y2", _ => _.target.y);

            nodes.attr('transform', function (node) {
                let cfg = merge({}, options.models.defaults, options.models[node.archetype] || {});

                let dx = cfg.shape.width / 2 * cfg.shape.scale;
                let dy = cfg.shape.height / 2 * cfg.shape.scale;

                return `translate(${node.x - dx}, ${node.y - dy}) scale(${cfg.shape.scale}, ${cfg.shape.scale})`
            });
        },

        remove: function () {
            svg.remove();
        }
    }
}