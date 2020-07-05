import jsyaml from 'js-yaml';

export function parse(script) {
    let models = jsyaml.load(script);

    let context = {
        result: {
            models: [],
            relationships: []
        }
    }

    if (!Array.isArray(models)) parseModel(context, models);

    return context.result;
}

function parseModel(context, model) {
    if ('contract' in model) parseContract(context, model);
}

function parseContract(context, model) {
    let contract = {
        id: model.contract,
        attributes: parseTimestamp(model.contract, model.key_timestamp)
    }

    context.result.models.push(contract);
}

function parseTimestamp(contract, attributes) {
    if (Array.isArray(attributes)) return attributes.map(a => Object.create({name: a, type: 'timestamp'}));
    if (typeof attributes === 'string' || attributes instanceof String)
        return attributes.split(/[ ,]+/).map(a => Object.create({name: a, type: 'timestamp'}));
    throw `Contract ${contract} must have timestamps`;
}

