import jsyaml from 'js-yaml';
import json from './json';
import error from "./error";
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

    yaml.optional.participants(contract, (participant) => createParticipant(context, contract, participant));
}

function createContractDetail(contract, detail) {
    if (isString(detail)) return json.model.contractDetails(detail);

    if (Object.keys(detail).length === 1) {
        let name = Object.keys(detail)[0];
        if (notObject(detail[name])) throw error.message.malformed(contract, 'details');
        let declaration = withId(detail[name], name);
        return json.model.contractDetails(name,
            yaml.optional.desc(declaration),
            yaml.optional.timestamp(declaration),
            yaml.optional.data(declaration))
    }

    throw error.message.malformed(contract, 'details');
}

function createFulfillment(context, contract, fulfillment) {
    function name(fulfillment, postfix) {
        return fulfillment.split(COMMA_SEPARATED).concat(postfix).join(' ');
    }

    function override(declaration, name) {
        if (!declaration) return name;
        let customized = yaml.optional.name(declaration);
        return !customized ? name : customized;
    }

    function attr(declaration) {
        if (!declaration) return [];
        return yaml.optional.timestamp(declaration).concat(yaml.optional.data(declaration));
    }

    if (isString(fulfillment)) {
        let request = context.model(json.model.fulfillmentRequest(name(fulfillment, 'Request'), '', []));
        let confirmation = context.model(json.model.fulfillmentConfirmation(name(fulfillment, 'Confirmation'), false, []));

        context.rel(json.rel.fulfillment(contract, request));
        context.rel(json.rel.confirmation(request, confirmation));
    } else if (Object.keys(fulfillment).length === 1) {
        let key = Object.keys(fulfillment)[0];

        if (notObject(fulfillment[key])) throw error.message.malformed(contract, 'fulfillment');

        let declaration = withId(fulfillment[key], key);

        let request = context.model(json.model.fulfillmentRequest(
            override(declaration.request, name(key, 'Request')),
            yaml.optional.desc(declaration), attr(declaration.request)));

        let confirmation = context.model(json.model.fulfillmentConfirmation(
            override(declaration.confirm, name(key, 'Confirmation')),
            declaration.confirm ? yaml.optional.variform(declaration.confirm) : false,
            attr(declaration.confirm)));

        context.rel(json.rel.fulfillment(contract, request));
        context.rel(json.rel.confirmation(request, confirmation));
    } else throw error.message.malformed(contract, 'fulfillment');
}

function createParticipant(context, contract, participant) {
    if (Object.keys(participant).length === 1) participant = Object.keys(participant)[0];
    if (isString(participant)) {
        if (participant.match(/^_+.+/)) {
            participant = (participant.split(/^_+/)[1]);
            context.model(json.model.role(participant));
        } else
            context.model(json.model.participant(participant));

        return context.rel(json.rel.participant(contract, participant));
    }
    throw error.message.malformed(contract, 'participants');
}


