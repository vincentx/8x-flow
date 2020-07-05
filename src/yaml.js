import json from "./json";
import {COMMA_SEPARATED, isString} from "./utils";

const yaml = {
    required: {
        timestamp: (entity) => timestamps(entity.id)(entity.key_timestamps)
    },
    optional: {
        desc: (entity) => optional(text, '')(entity.desc),
        timestamp: (entity) => optional(timestamps(entity.id), [])(entity.key_timestamps),
        data: (entity) => optional(stringList(array(json.attr.data, `${entity.id} have malformed data declaration`)), [])(entity.key_data),
        details: (entity, f) => many(entity.details, f),
        fulfillment: (entity, f) => many(entity.fulfillment, f),
    }
}

function many(value, f) {
    return optional(stringList(arrayOrMap(f)), [])(value);
}

function timestamps(id) {
    return (data) => stringList(array(json.attr.timestamp, `${id} must have timestamps`))(data);
}

function text(o) {
    return o.toString();
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

