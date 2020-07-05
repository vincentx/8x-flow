export default {
    attr: {
        data: (name) => attr(name, 'data'),
        timestamp: (name) => attr(name, 'timestamp')
    },
    model: {
        contract: (name, desc, ...attributes) => model(name, desc, 'contract', ...attributes),
        contractDetails: (name,desc, ...attributes) => model(name, desc, 'contract-details', ...attributes)
    },
    rel: {
        details: (source, target) => relationship(source, target, 'details')
    }
};

function relationship(source, target, type) {
    return {source: source, target: target, type: type};
}

function model(name, desc, archetype, ...attributes) {
    return {
        id: name,
        desc: desc,
        archetype: archetype,
        attributes: attributes.length === 0 ? [] : attributes.reduce((acc, cur) => acc.concat(cur))
    }
}

function attr(name, type) {
    return {name: name, type: type};
}