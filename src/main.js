import jsyaml from 'js-yaml';

export function parse(script) {
    let models = jsyaml.load(script);

    let context = {
        result: {
            models: [],
            relationships: []
        }
    }

    if (models === undefined) return context.result;

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
    if (typeof attributes === 'string' || attributes instanceof String) attributes = attributes.split(/[ ,]+/);
    if (!Array.isArray(attributes)) throw `Contract ${contract} must have timestamps`;

    return attributes.map(_ => Object.create({name: _, type: 'timestamp'}))
}

