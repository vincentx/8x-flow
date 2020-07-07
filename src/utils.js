export function isString(o) {
    return typeof o === 'string' || o instanceof String
}

export function isObject(o) {
    return typeof o === 'object' && !Array.isArray(o);
}

export function withId(o, id) {
    if (!o) return {id: id};
    if (isString(o)) return {id: id, description: o}
    o.id = id;
    return o;
}

export const COMMA_SEPARATED = /[ ]*,[ ]*/;
