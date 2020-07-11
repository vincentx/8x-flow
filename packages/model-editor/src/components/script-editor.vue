<template>
    <div class="script-editor">
        <textarea ref="textarea" class="script"></textarea>
    </div>
</template>

<script>
    import CodeMirror from "codemirror/lib/codemirror";
    import "codemirror/mode/yaml/yaml";

    import "codemirror/lib/codemirror.css"
    import "codemirror/theme/ambiance.css";

    export default {
        name: 'script-editor',
        data: function () {
            return {
                script: ""
            }
        },
        mounted() {
            this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
                mode: "text/yaml",
                theme: "ambiance",
                lineNumbers: true,
                line: true
            });

            this.editor.setValue(this.script);

            this.editor.on("change", (script) => {
                this.script = script.getValue();
                this.$emit('input', this.script);
            });
        }
    }
</script>