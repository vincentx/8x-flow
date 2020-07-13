<template>
    <div class="model-viewer" ref="container">

    </div>
</template>

<script>
    import * as d3chart from "@8x-flow/d3-chart";
    import {select} from "d3-selection";
    import {forceCenter, forceLink, forceManyBody, forceSimulation} from "d3-force";
    import {zoom} from "d3-zoom";
    import {handleDrag, handleZoom} from "./_handle_evnets";

    export default {
        name: 'model-viewer',
        props: ['graph'],
        data: function () {
            return {
                bom: {
                    models: [],
                    relationships: []
                }
            }
        },
        mounted() {
            this.render(this.graph || this.bom);
        },
        watch: {
            graph(data) {
                this.chart.remove();
                this.render(data);
            }
        },
        methods: {
            render(data) {
                this.chart = d3chart.render(select(this.$refs.container), {
                    data: data,
                    view: function (presenter) {
                        let force = forceSimulation(presenter.nodes.data())
                            .force("link", forceLink(presenter.links.data()).id(d => d.id).distance(90))
                            .force("charge", forceManyBody().strength(-300))
                            .force("center", forceCenter(presenter.options.view.width / 2, presenter.options.view.height / 2))
                            .on("tick", presenter.tick);

                        presenter.nodes.call(handleDrag(force));

                        presenter.svg.call(zoom()
                            .extent([[0, 0], [presenter.options.view.width, presenter.options.view.height]])
                            .scaleExtent([0.025, 2.5])
                            .on("zoom", handleZoom(presenter)));
                    }
                })
            }
        }
    }
</script>

<style>
    .model-viewer {
        height: 100%;
        overflow: auto
    }
</style>