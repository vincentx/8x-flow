import jsyaml from 'js-yaml';
import {jsonContext} from './json';
import yaml from "./yaml";
import context from './context';
import {COMMA_SEPARATED, withId} from "./utils";

export function parse(script) {
    return parseModel(jsonContext(context()), jsyaml.load(script)).result;
}

function parseModel(context, model) {
    parseContract(context, withId(model, model.contract));
    return context;
}

function parseContract(context, contract) {
    context.model.contract(contract.id,
        yaml.desc(contract),
        attrs(yaml.required.timestamp(contract), yaml.data(contract)));

    yaml.details(contract, createContractDetail(context));
    yaml.fulfillment(contract, createFulfillment(context));
    yaml.participants(contract, createParticipant(context));
}

function attrs(...attributes) {
    return attributes.reduce((acc, cur) => acc.concat(cur));
}

function createContractDetail(context) {
    return function (parent, declaration) {
        yaml.participants(declaration, createParticipant(context));

        context.rel.details(parent, context.model.contractDetails(
            declaration.id,
            yaml.desc(declaration),
            attrs(yaml.timestamp(declaration), yaml.data(declaration))
        ));
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
        return attrs(yaml.timestamp(declaration), (yaml.data(declaration)));
    }

    return function (parent, declaration) {
        let request = context.model.fulfillmentRequest(
            override(declaration.request, name(declaration.id, 'Request')),
            yaml.desc(declaration),
            attr(declaration.request));

        if (declaration.request)
            yaml.participants(withId(declaration.request, request.id), createParticipant(context));

        let confirmation = context.model.fulfillmentConfirmation(
            override(declaration.confirm, name(declaration.id, 'Confirmation')),
            declaration.confirm ? yaml.variform(declaration.confirm) : false,
            attr(declaration.confirm));

        if (declaration.confirm)
            yaml.participants(withId(declaration.confirm, confirmation.id), createParticipant(context));

        context.rel.fulfillment(parent, request);
        context.rel.confirmation(request, confirmation);
    }
}

function createParticipant(context) {
    return function (parent, declaration) {
        let participant = declaration.id;
        if (participant.match(/^_+.+/)) {
            participant = (participant.split(/^_+/)[1]);
            context.model.role(participant);
        } else
            context.model.participant(participant);

        context.rel.participant(parent, participant);
    }
}


