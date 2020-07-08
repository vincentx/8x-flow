export default function context() {
    let result = {
        models: [],
        relationships: []
    }

    let models = {};

    function merge(lhs, rhs) {
        function length(s) {
            return s ? s.length : 0;
        }
        if (!lhs.attributes) lhs.attributes = [];
        if (rhs.attributes) lhs.attributes = lhs.attributes.concat(rhs.attributes);
        if (length(lhs.desc) < length(rhs.desc)) lhs.desc = rhs.desc;
        return lhs;
    }

    return {
        result: result,

        model: function (model) {
            if (models[model.id]) return merge(models[model.id], model);
            result.models.push(model);
            models[model.id] = model;
            return model;
        },
        rel: (_) => result.relationships.push(_)
    };
}