<template>
    <div class="model-viewer" ref="container">

    </div>
</template>

<script>
    import * as d3chart from "@8x-flow/d3-chart";
    import {select} from "d3-selection";
    import {forceCenter, forceLink, forceManyBody, forceSimulation} from "d3-force";
    import {handleDrag} from "./_handle_drag";

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
                    view: function (nodes, links, options, tick) {
                        let force = forceSimulation(nodes.data())
                            .force("link", forceLink(links.data()).id(d => d.id).distance(90))
                            .force("charge", forceManyBody().strength(-400))
                            .force("center", forceCenter(options.view.width / 2, options.view.height / 2))
                            .on("tick", tick);

                        nodes.call(handleDrag(force));
                    }
                })
            }
        }
    }
</script>