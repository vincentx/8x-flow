<template>
    <div class="script-editor">
        <textarea ref="textarea" class="script"></textarea>
    </div>
</template>

<script>
    import CodeMirror from "codemirror/lib/codemirror";
    import "codemirror/mode/yaml/yaml";

    import "codemirror/lib/codemirror.css"
    import "codemirror/theme/panda-syntax.css";

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
                tabSize: 2
            });

            this.editor.setValue(this.yaml || this.script);

            this.editor.on("change", (script) => {
                this.script = script.getValue();
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