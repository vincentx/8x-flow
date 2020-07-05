export function isString(o) {
    return typeof o === 'string' || o instanceof String
}

export function notObject(o) {
    return typeof o !== 'object' || Array.isArray(o);
}

export function withId(o, id) {
    if (!o) return {};
    o.id = id;
    return o;
}

export const COMMA_SEPARATED = /[ ]*,[ ]*/;
