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
        attributes: parseTimestamp(model.contract, model.key_timestamp).concat(parseData(model.contract, model.key_data))
    }

    context.result.models.push(contract);

    if (model.details) parseContractDetails(context, contract, model.details);
}

function parseContractDetails(context, contract, details) {
    acceptCommaSeparated(details, _1 =>
        acceptArray(_1, _2 =>
            _2.forEach(_3 => parseContractDetail(context, contract, _3))
        ));
}

function parseContractDetail(context, contract, detail) {
    context.result.models.push({
        id: detail,
        attributes: []
    });

    context.result.relationships.push({
        source: contract.id,
        target: detail,
        type: 'details'
    });
}

function parseTimestamp(contract, attributes) {
    return acceptCommaSeparated(attributes, _1 =>
        onlyAcceptArray(_1, `Contract ${contract} must have timestamps`, _2 =>
            _2.map(toTimestamp)));
}

function parseData(contract, data) {
    return acceptBlank(data, [], _1 =>
        acceptCommaSeparated(_1, _2 =>
            onlyAcceptArray(_2, `Contract ${contract} have malformed data declaration`, _3 =>
                _3.map(toData))));
}

function toData(name) {
    return {name: name, type: 'data'};
}

function toTimestamp(name) {
    return {name: name, type: 'timestamp'};
}

function acceptBlank(data, result, next) {
    if (!data) return result;
    return next(data);
}

function acceptCommaSeparated(data, next) {
    return next(typeof data === 'string' || data instanceof String ? data.split(/[ ,]+/) : data);
}

function onlyAcceptArray(data, message, next) {
    if (!Array.isArray(data)) throw message;
    return next(data);
}

function acceptArray(data, handle, next) {
    if (Array.isArray(data)) return handle(data);
    if (next) return next(data);
}

