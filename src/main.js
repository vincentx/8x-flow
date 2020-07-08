import jsyaml from 'js-yaml';
import {jsonContext} from './json';
import yaml from "./yaml";
import context from './context';
import {COMMA_SEPARATED, withId} from "./utils";
import error from "./error";

export function parse(script) {
    let model = jsyaml.load(script);
    let ctx = jsonContext(context());
    if (Array.isArray(model)) model.forEach((_) => parseModel(ctx, _))
    else parseModel(ctx, model);
    return ctx.result;
}

function parseModel(context, model) {
    ["contract", "rfp", "proposal", "evidence"]
        .filter(type => model[type] !== undefined)
        .forEach((type) => parseMomentInterval(context, withId(model, model[type]), context.model[type]));

    if (model["contract"]) parseContract(context, withId(model, model.contract))
}

function parseContract(context, contract) {
    yaml.fulfillment(contract, createFulfillment(context));
}

function parseMomentInterval(context, mi, type) {
    type(mi.id, yaml.desc(mi), attrs(yaml.required.timestamp(mi), yaml.data(mi)));

    parseMomentIntervalAssoc(context, mi);
}

function parseMomentIntervalAssoc(context, mi) {
    yaml.details(mi, createDetails(context));
    yaml.plays(mi, createPlayAsRole(context));
    yaml.participants(mi, createParticipant(context));
    yaml.evidences(mi, createEvidence(context));
}

function createDetails(context) {
    return function (parent, declaration) {
        context.rel.details(parent, context.model.details(
            declaration.id,
            yaml.desc(declaration),
            attrs(yaml.timestamp(declaration), yaml.data(declaration))
        ));

        yaml.participants(declaration, createParticipant(context));
    }
}

function createParticipant(context) {
    return function (parent, declaration) {
        let participant = yaml.role.is(declaration.id) ?
            context.model.role(yaml.role.name(declaration.id)) : context.model.participant(declaration.id);

        context.rel.participant(parent, participant);
    }
}

function createPlayAsRole(context) {
    return function (parent, declaration) {
        if (!yaml.role.is(declaration.id)) throw error.message.roleRequired(parent);
        context.rel.plays(parent, context.model.role(yaml.role.name(declaration.id)));
    }
}

function createEvidence(context) {
    return function (parent, declaration) {
        context.rel.evidence(parent, context.model.evidence(declaration.id));
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

    function parse(context, parent, declaration) {
        if (!declaration) return;

        parseMomentIntervalAssoc(context, withId(declaration, parent.id));
    }

    return function (parent, declaration) {
        let request = context.model.fulfillmentRequest(
            override(declaration.request, name(declaration.id, 'Request')),
            yaml.desc(declaration),
            attr(declaration.request));

        let confirmation = context.model.fulfillmentConfirmation(
            override(declaration.confirm, name(declaration.id, 'Confirmation')),
            declaration.confirm ? yaml.variform(declaration.confirm) : false,
            attr(declaration.confirm));

        parse(context, request, declaration.request);
        parse(context, confirmation, declaration.confirm);

        context.rel.fulfillment(parent, request);
        context.rel.confirmation(request, confirmation);
    }
}

function attrs(...attributes) {
    return attributes.reduce((acc, cur) => acc.concat(cur));
}



