<template>
    <div id="model-editor" class="full height">
        <div class="columns">
            <div class="column is-one-third has-background-dark">
                1
            </div>
            <div class="column is-two-thirds has-background-primary-light">
                2
            </div>
        </div>
    </div>
</template>

<script>

    import 'bulma/css/bulma.css';

    export default {
        name: 'model-editor',
        components: {}
    }
</script>

<style>
    .columns {
        height: 100%;
    }

    .script-editor .column{
        height: 600px;
    }
</style>
