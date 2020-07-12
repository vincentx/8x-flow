<template>
    <div class="script-editor">
        <textarea ref="textarea" class="script"></textarea>
    </div>
</template>

<script>
    import CodeMirror from "codemirror/lib/codemirror";
    import "codemirror/mode/yaml/yaml";
    import "codemirror/addon/lint/lint";

    import "codemirror/lib/codemirror.css"
    import "codemirror/theme/panda-syntax.css";
    import "codemirror/addon/lint/lint.css";
    import {parse} from "./script-editor.lint";

    CodeMirror.registerHelper("lint", "yaml", parse);

    export default {
        name: 'script-editor',
        data: function () {
            return {
                script: ""
            }
        },
        props: ["yaml"],
        mounted() {
            this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
                mode: "text/yaml",
                theme: "panda-syntax",
                lineNumbers: true,
                line: true,
                tabSize: 2,
                gutters: ["CodeMirror-lint-markers"],
                lint: true
            });

            this.editor.setValue(this.yaml || this.script);

            this.editor.on("change", (script) => {
                this.script = script.getValue();
                this.editor.performLint();
                this.$emit('input', this.script);
            });
        }
    }
</script>

<style>
    .script-editor {
        height: 100%;
    }

    .CodeMirror {
        height: 100%;
    }
</style>