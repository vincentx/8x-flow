<template>
    <section id="model-editor">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item">
                    <img :src="logo" height="28">
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="model-editor-menu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
        </nav>

        <div class="columns">
            <div class="column is-one-third has-background-dark">
                <script-editor v-model="yaml"></script-editor>
            </div>
            <div class="column is-two-thirds has-background-white-ter">
                <model-viewer v-bind:graph="graph"></model-viewer>
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

    export default {
        name: 'model-editor',
        components: {ModelViewer, ScriptEditor},
        data: function () {
            return {
                logo: logo,
                yaml: "",
                stop: true,
                cached_graph: {
                    models: [],
                    relationships: []
                }
            }
        },
        computed: {
            graph: function () {
                try {
                    this.cached_graph = dsl.parse(this.yaml);
                } catch (e) {
                }
                return this.cached_graph;
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
</style>
