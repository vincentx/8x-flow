<template>
    <div class="model-viewer" ref="container">

    </div>
</template>

<script>
    import * as d3chart from "@8x-flow/d3-chart";
    import {event, select} from "d3-selection";
    import {drag} from "d3-drag"
    import {forceCenter, forceLink, forceManyBody, forceSimulation} from "d3-force";

    export default {
        name: 'model-viewer',
        data: function () {
            return {
                graph: {
                    models: [],
                    relationships: []
                }
            }
        },
        mounted() {
            let graph = this.graph;

            d3chart.render(select(this.$refs.container), {
                options: {
                    models: {
                        defaults: {
                            shape: {scale: 0.4}
                        }
                    }
                },
                data: graph,
                view: function (nodes, links, options, tick) {
                    let force = forceSimulation(nodes.data())
                        .force("link", forceLink(links.data()).id(d => d.id).distance(90))
                        .force("charge", forceManyBody().strength(-400))
                        .force("center", forceCenter(options.view.width / 2, options.view.height / 2))
                        .on("tick", tick);

                    nodes.call(drag()
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
                        }));
                }
            });
        }
    }
</script>