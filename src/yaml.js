import json from "./json";
import error from './error';
import {COMMA_SEPARATED, isString} from "./utils";

const yaml = {
    required: {
        timestamp: (entity) => required(timestamps(entity), error.message.required(entity, 'key_timestamps'))(entity.key_timestamps)
    },
    optional: {
        name: (entity) => optional(text, '')(entity.name),
        desc: (entity) => optional(text, '')(entity.desc),
        timestamp: (entity) => optional(timestamps(entity), [])(entity.key_timestamps),
        data: (entity) => optional(stringList(array(json.attr.data, error.message.malformed(entity, 'key_data'))), [])(entity.key_data),
        variform: (entity) => optional(bool, false)(entity.variform),

        details: (entity, f) => many(entity.details, f),
        fulfillment: (entity, f) => many(entity.fulfillment, f),
        participants: (entity, f) => many(entity.participants, f),
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

