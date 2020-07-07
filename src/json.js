export default {
    attr: {
        data: (name) => attr(name, 'data'),
        timestamp: (name) => attr(name, 'timestamp')
    },
    model: {
        contract: (name, desc, ...attributes) => model(name, desc, 'contract', reduce(attributes)),
        contractDetails: (name, desc, ...attributes) => model(name, desc || '', 'contract-details', reduce(attributes)),
        fulfillmentRequest: (name, desc, attributes) => model(name, desc, 'fulfillment', attributes),
        fulfillmentConfirmation: (name, variform, attributes) => model(name, '', variform ? 'variform' : 'fulfillment', attributes),
        participant: (name) => model(name, '', 'participant', []),
        role: (name) => model(name, '', 'role', [])
    },
    rel: {
        details: (source, target) => relationship(source.id, target.id, 'details'),
        fulfillment: (source, target) => relationship(source.id, target.id, 'fulfillment'),
        confirmation: (source, target) => relationship(source.id, target.id, 'confirmation'),
        participant: (source, target) => relationship(source.id, target, 'participant'),
    }
};

function relationship(source, target, type) {
    return {source: source, target: target, type: type};
}

function reduce(attributes) {
    return attributes.reduce((acc, cur) => acc.concat(cur));
}

function model(name, desc, archetype, attributes) {
    return {
        id: name,
        desc: desc,
        archetype: archetype,
        attributes: attributes
    }
}

function attr(name, type) {
    return {name: name, type: type};
}