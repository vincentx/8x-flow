import json from "./json";
import error from './error';
import {COMMA_SEPARATED, isObject, isString, withId} from "./utils";

const yaml = {
    required: {
        timestamp: (entity) => required(timestamps(entity), error.message.required(entity, 'key_timestamps'))(entity.key_timestamps)
    },
    name: (entity) => optional(text, '')(entity.name),
    desc: (entity) => optional(text, '')(entity.desc),
    timestamp: (entity) => optional(timestamps(entity), [])(entity.key_timestamps),
    data: (entity) => optional(stringList(array(json.attr.data, error.message.malformed(entity, 'key_data'))), [])(entity.key_data),
    variform: (entity) => optional(bool, false)(entity.variform),

    details: (entity, f) => many(entity.details, _(f, entity, 'details', isObject)),
    fulfillment: (entity, f) => many(entity.fulfillment, _(f, entity, 'fulfillment', isObject)),
    participants: (entity, f) => many(entity.participants, _(f, entity, 'participants', _ => true)),
    evidences: (entity, f) => many(entity.evidences, _(f, entity, 'evidences', _ => true)),

    role: {
        is: (_) => _.match(/^_+.+/),
        name: (_) => _.split(/^_+/)[1]
    }
}

function _(f, entity, field, valid) {
    return function (value) {
        if (isString(value)) return f(entity, {id: value});
        if (Object.keys(value).length === 1) {
            let name = Object.keys(value)[0];
            if (!valid(value[name])) throw error.message.malformed(entity, field);
            return f(entity, withId(value[name], name));
        }
        throw error.message.malformed(entity, field);
    }
}

function many(value, f) {
    return optional(stringList(arrayOrMap(f)), [])(value);
}

function timestamps(entity) {
    return (data) => stringList(array(json.attr.timestamp, error.message.malformed(entity, 'key_timestamps')))(data);
}

function bool(o) {
    if (typeof o === "boolean") return o;
    return ['y', 'yes', 'ok', 'sure'].includes(text(o).toLowerCase());
}

function text(o) {
    return o.toString();
}

function required(next, message) {
    return (data) => {
        if (!data) throw message;
        return next(data);
    }
}

function optional(next, result) {
    return (data) => {
        if (!data) return result;
        return next(data);
    };
}

function stringList(next) {
    return (data) => next(isString(data) ? data.split(COMMA_SEPARATED) : data);
}

function array(f, message) {
    return (data) => {
        if (!Array.isArray(data)) throw message;
        return data.map(f);
    }
}

function arrayOrMap(handle) {
    function toArray(array) {
        return Object.keys(array).map(function (key) {
            let result = {};
            result[key] = array[key];
            return result;
        });
    }

    return (data) => (Array.isArray(data) ? data : toArray(data)).forEach(handle);
}

export default yaml;

