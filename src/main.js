import jsyaml from 'js-yaml';
import json from './json';
import yaml from "./yaml";
import {COMMA_SEPARATED, isString, notObject, withId} from "./utils";

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

    parseModel(context, models);

    return context.result;
}

function parseModel(context, model) {
    parseContract(context, withId(model, model.contract));
}

function parseContract(context, contract) {
    context.model(json.model.contract(contract.id,
        yaml.optional.desc(contract),
        yaml.required.timestamp(contract),
        yaml.optional.data(contract)));

    yaml.optional.details(contract, (detail) =>
        context.rel(json.rel.details(contract, context.model(createContractDetail(contract, detail)))));

    yaml.optional.fulfillment(contract, (fulfillment) => createFulfillment(context, contract, fulfillment));
}

function createContractDetail(contract, detail) {
    if (isString(detail)) return json.model.contractDetails(detail);

    if (Object.keys(detail).length === 1) {
        let name = Object.keys(detail)[0];
        if (notObject(detail[name])) throw `${contract.id} details has malformed declaration`;
        let declaration = withId(detail[name], name);
        return json.model.contractDetails(name,
            yaml.optional.desc(declaration),
            yaml.optional.timestamp(declaration),
            yaml.optional.data(declaration))
    }

    throw `${contract.id} details has malformed declaration`;
}

function createFulfillment(context, contract, fulfillment) {
    if (isString(fulfillment)) {
        let name = fulfillment.split(COMMA_SEPARATED);

        let request = context.model(json.model.fulfillmentRequest(name.concat('Request').join(' ')));
        let confirmation = context.model(json.model.fulfillmentConfirmation(name.concat('Confirmation').join(' ')));

        context.rel(json.rel.fulfillment(contract, request));
        context.rel(json.rel.confirmation(request, confirmation));
    } else if (Object.keys(fulfillment).length === 1) {
        let name = Object.keys(fulfillment)[0];

        if (notObject(fulfillment[name])) throw `${contract.id} fulfillment has malformed declaration`;

        let declaration = withId(fulfillment[name], name);

        let request = context.model(json.model.fulfillmentRequest(name.split(COMMA_SEPARATED).concat('Request').join(' '),
            yaml.optional.desc(declaration)));
        let confirmation = context.model(json.model.fulfillmentConfirmation(name.split(COMMA_SEPARATED)
            .concat('Confirmation').join(' ')));

        context.rel(json.rel.fulfillment(contract, request));
        context.rel(json.rel.confirmation(request, confirmation));
    } else throw `${contract.id} fulfillment has malformed declaration`;
}

