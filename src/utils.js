export function isString(o) {
    return typeof o === 'string' || o instanceof String
}

export function withId(o, id) {
    o.id = id;
    return o;
}
