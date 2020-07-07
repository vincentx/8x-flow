import jsyaml from 'js-yaml';
import json from './json';
import yaml from "./yaml";
import context from './context';
import {COMMA_SEPARATED, withId} from "./utils";

export function parse(script) {
    return parseModel(context(), jsyaml.load(script)).result;
}

function parseModel(context, model) {
    parseContract(context, withId(model, model.contract));
    return context;
}

function parseContract(context, contract) {
    context.model(json.model.contract(contract.id,
        yaml.desc(contract),
        yaml.required.timestamp(contract),
        yaml.data(contract)));

    yaml.details(contract, createContractDetail(context));
    yaml.fulfillment(contract, createFulfillment(context));
    yaml.participants(contract, createParticipant(context));
}

function createContractDetail(context) {
    return function(parent, declaration) {
        yaml.participants(declaration, createParticipant(context));

        context.rel(json.rel.details(parent, context.model(json.model.contractDetails(declaration.id,
            yaml.desc(declaration),
            yaml.timestamp(declaration),
            yaml.data(declaration)))));
    }
}

function createFulfillment(context) {
    function name(fulfillment, postfix) {
        return fulfillment.split(COMMA_SEPARATED).concat(postfix).join(' ');
    }

    function override(declaration, name) {
        if (!declaration) return name;
        let customized = yaml.name(declaration);
        return !customized ? name : customized;
    }

    function attr(declaration) {
        if (!declaration) return [];
        return yaml.timestamp(declaration).concat(yaml.data(declaration));
    }
    return function(parent, declaration) {
        let request = context.model(json.model.fulfillmentRequest(
            override(declaration.request, name(declaration.id, 'Request')),
            yaml.desc(declaration), attr(declaration.request)));
        if (declaration.request)
            yaml.participants(withId(declaration.request, request.id), createParticipant(context));

        let confirmation = context.model(json.model.fulfillmentConfirmation(
            override(declaration.confirm, name(declaration.id, 'Confirmation')),
            declaration.confirm ? yaml.variform(declaration.confirm) : false,
            attr(declaration.confirm)));

        if (declaration.confirm)
            yaml.participants(withId(declaration.confirm, confirmation.id), createParticipant(context));

        context.rel(json.rel.fulfillment(parent, request));
        context.rel(json.rel.confirmation(request, confirmation));
    }
}

function createParticipant(context) {
    return function (parent, declaration) {
        let participant = declaration.id;
        if (participant.match(/^_+.+/)) {
            participant = (participant.split(/^_+/)[1]);
            context.model(json.model.role(participant));
        } else
            context.model(json.model.participant(participant));

        return context.rel(json.rel.participant(parent, participant));
    }
}


