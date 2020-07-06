export default function context() {
    let result = {
        models: [],
        relationships: []
    }

    let models = {};

    return {
        result: result,

        model: function (model) {
            if(models[model.id]) return models[model.id];
            result.models.push(model);
            models[model.id] = model;
            return model;
        },
        rel: (_) => result.relationships.push(_)
    };
}