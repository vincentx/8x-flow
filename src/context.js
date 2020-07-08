import error from "./error";

export default function context() {
    let result = {
        models: [],
        relationships: []
    }

    let archetype = [
        ["system", "role"],
        ["domain", "role"],
        ["party", "participant"],
        ["place", "participant"],
        ["thing", "participant"],
        ["contract"],
        ["agreement"],
        ["evidence"],
        ["proposal"],
        ["rfp"],
        ["fulfillment"],
        ["variform"],
    ];

    let models = {};

    function merge(lhs, rhs) {
        function mergeAttributes() {
            function length(s) {
                return s ? s.length : 0;
            }

            if (!lhs.attributes) lhs.attributes = [];
            if (rhs.attributes) lhs.attributes = lhs.attributes.concat(rhs.attributes);
            if (length(lhs.desc) < length(rhs.desc)) lhs.desc = rhs.desc;
        }

        function mergeArchetype() {
            if (!rhs.archetype) return;
            let found = archetype.filter((level) => level.includes(lhs.archetype) && level.includes(rhs.archetype));

            if (found.length === 0) throw error.message.mismatchArchetype(lhs, rhs);

            let lArch = found[0].indexOf(lhs.archetype);
            let rArch = found[0].indexOf(rhs.archetype);

            if (lArch > rArch) lhs.archetype = rhs.archetype;
        }

        mergeAttributes();
        mergeArchetype();
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