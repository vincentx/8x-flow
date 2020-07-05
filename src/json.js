export default {
    attr: {
        data: (name) => attr(name, 'data'),
        timestamp: (name) => attr(name, 'timestamp')
    },
    model: {
        contract: (name, ...attributes) => model(name, 'contract', ...attributes),
        contractDetails: (name, ...attributes) => model(name, 'contract-details', ...attributes)
    },
    rel: {
        details: (source, target) => relationship(source, target, 'details')
    }
};

function relationship(source, target, type) {
    return {source: source, target: target, type: type};
}

function model(name, archetype, ...attributes) {
    return {
        id: name,
        archetype: archetype,
        attributes: attributes.length === 0 ? [] : attributes.reduce((acc, cur) => acc.concat(cur))
    }
}

function attr(name, type) {
    return {name: name, type: type};
}