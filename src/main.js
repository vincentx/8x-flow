import jsyaml from 'js-yaml';
import json from './json';
import yaml from "./yaml";
import {isString, withId} from "./utils";

export function parse(script) {
    let models = jsyaml.load(script);

    let context = {
        result: {
            models: [],
            relationships: []
        },

        model: function (model) {
            context.result.models.push(model);
            return model;
        },
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
    context.model(json.model.contract(model.id,
        yaml.optional.desc(model),
        yaml.required.timestamp(model),
        yaml.optional.data(model)));

    yaml.optional.details(model, (detail) =>
        context.rel(json.rel.details(model.id, context.model(createContractDetail(model, detail)).id)));
}

function createContractDetail(contract, detail) {
    if (isString(detail)) return json.model.contractDetails(detail, '');

    if (Object.keys(detail).length === 1) {
        let name = Object.keys(detail)[0];
        let declaration = withId(detail[name], name);
        return json.model.contractDetails(name,
            yaml.optional.desc(declaration),
            yaml.optional.timestamp(declaration),
            yaml.optional.data(declaration))
    }

    throw `${contract.id} details has malformed declaration`;
}
