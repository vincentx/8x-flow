import jsyaml from 'js-yaml';
import json from './json';

export function parse(script) {
    let models = jsyaml.load(script);

    let context = {
        result: {
            models: [],
            relationships: []
        },

        model: (_) => context.result.models.push(_),
        rel: (_) => context.result.relationships.push(_)
    }

    if (models === undefined) return context.result;

    if (!Array.isArray(models)) parseModel(context, models);

    return context.result;
}

function parseModel(context, model) {
    if ('contract' in model) parseContract(context, withId(model, model.contract));
}

function parseContract(context, model) {
    let contract = json.model.contract(model.contract,
        parseDesc(model),
        parseTimestamp(model),
        parseData(model));

    context.model(contract);

    if (model.details) parseContractDetails(context, contract, model.details);
}

function parseContractDetails(context, contract, details) {
    function parseContractDetail(detail) {
        function createDetail() {
            if (isString(detail)) return json.model.contractDetails(detail);

            if (Object.keys(detail).length === 1) {
                let name = Object.keys(detail)[0];
                let declaration = withId(detail[name], name);
                return json.model.contractDetails(name,
                    parseDetailTimestamp(declaration),
                    parseData(declaration))
            }

            throw `${contract.id} details has malformed declaration`;
        }

        let contractDetail = createDetail();

        context.model(contractDetail);
        context.rel(json.rel.details(contract.id, contractDetail.id));
    }

    acceptCommaSeparated(details, _1 =>
        acceptArray(_1, _2 => _2.forEach(parseContractDetail), _3 =>
            acceptMap(_3, _4 => _4.forEach(parseContractDetail))));
}


function parseTimestamp(entity) {
    return acceptCommaSeparated(entity.key_timestamps, _1 =>
        onlyAcceptArray(_1, `${entity.id} must have timestamps`, _2 =>
            _2.map(json.attr.timestamp)));
}

function parseDetailTimestamp(entity) {
    return acceptBlank(entity.key_timestamps, [], _ =>parseTimestamp(entity));
}

function parseDesc(entity) {
    return acceptBlank(entity.desc, '', _ => _);
}

function parseData(entity) {
    return acceptBlank(entity.key_data, [], _1 =>
        acceptCommaSeparated(_1, _2 =>
            onlyAcceptArray(_2, `${entity.id} have malformed data declaration`, _3 =>
                _3.map(json.attr.data))));
}

function acceptBlank(data, result, next) {
    if (!data) return result;
    return next(data);
}

function acceptCommaSeparated(data, next) {
    return next(isString(data) ? data.split(/[ ,]+/) : data);
}

function onlyAcceptArray(data, message, next) {
    if (!Array.isArray(data)) throw message;
    return next(data);
}

function acceptArray(data, handle, next) {
    if (Array.isArray(data)) return handle(data);
    return next(data);
}

function acceptMap(data, next) {
    next(Object.keys(data).map(function (key) {
        let result = {};
        result[key] = data[key];
        return result;
    }));
}

function withId(o, id) {
    o.id = id;
    return o;
}

function isString(o) {
    return typeof o === 'string' || o instanceof String
}

