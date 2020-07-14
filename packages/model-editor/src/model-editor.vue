<template>
    <section id="model-editor">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item">
                    <img :src="logo" height="28">
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu">
                <div class="navbar-start">
                    <div class="navbar-item">
                        <div class="dropdown is-hoverable">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" aria-controls="examples">
                                    <span>Examples</span>
                                </button>
                            </div>
                            <div class="dropdown-menu" id="examples" role="menu">
                                <div class="dropdown-content">
                                    <a href="#" class="dropdown-item"
                                       v-for="example in examples"
                                       @click="loadExample(example.uri)">
                                        {{example.name}}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button" id="download-script" @click="downloadScript">
                                Save Script
                            </a>
                            <a class="button" id="download-graph" @click="downloadGraph">
                                Save Graph
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>


        <div class="columns">
            <div class="column is-one-third has-background-dark">
                <script-editor v-model="yaml"></script-editor>
            </div>
            <div class="column is-two-thirds has-background-white-ter">
                <model-viewer v-bind:graph="graph" ref="viewer"></model-viewer>
            </div>
        </div>
    </section>
</template>

<script>
    import 'bulma/css/bulma.css';
    import logo from './assets/8x-flow-logo.png';

    import ScriptEditor from "./components/script-editor";
    import ModelViewer from "./components/model-viewer";

    import * as dsl from "@8x-flow/yaml-script";
    import {saveAs} from "file-saver";

    export default {
        name: 'model-editor',
        components: {ModelViewer, ScriptEditor},
        data: function () {
            return {
                logo: logo,
                yaml: "",
                cached_graph: {
                    models: [],
                    relationships: []
                },
                examples: []
            }
        },
        mounted() {
            fetch("/8x-flow/examples/index.json").then(_ => this.examples = _.json());
        },
        computed: {
            graph: function () {
                try {
                    this.cached_graph = dsl.parse(this.yaml);
                } catch (e) {
                }
                return this.cached_graph;
            },
        },
        methods: {
            downloadScript() {
                saveAs(new Blob([this.yaml], {type: "text/plain;charset=utf-8"}), "models.yaml");
            },
            downloadGraph() {
                let svg = `<?xml version="1.0" standalone="no"?>\r\n${this.$refs.viewer.$el.querySelector("svg").outerHTML}`;
                saveAs(new Blob([svg], {type: "image/svg+xml;charset=utf-8"}), "models.svg");
            },
            async loadExample(uri) {
                this.yaml = await fetch(uri).then(_ => _.text());
            }
        }
    }
</script>

<style>

    html, body {
        height: 100%;
        margin: 0;
    }

    #model-editor {
        height: calc(100% - 56px);
    }

    .columns {
        height: 100%;
    }

    .column {
        height: 100%;
    }

    #download-script {
        color: white;
        background-color: rgb(216, 83, 43);
    }

    #download-graph {
        color: white;
        background-color: rgb(226, 125, 45);
    }
</style>
