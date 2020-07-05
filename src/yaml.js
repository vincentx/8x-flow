import json from "./json";
import {COMMA_SEPARATED, isString} from "./utils";

const yaml = {
    required: {
        timestamp: (entity) =>
            commaSeparated(
                arrayOnly(`${entity.id} must have timestamps`,
                    json.attr.timestamp))(entity.key_timestamps)
    },
    optional: {
        desc: (entity) => optional('', _ => _.toString())(entity.desc),
        timestamp: (entity) => optional([], _ => yaml.required.timestamp(entity))(entity.key_timestamps),
        data: (entity) => optional([],
            commaSeparated(
                arrayOnly(`${entity.id} have malformed data declaration`,
                    json.attr.data)))(entity.key_data),
        details: (entity, f) => hasMany(entity.details, f),
        fulfillment: (entity, f) => hasMany(entity.fulfillment, f),
    }
}

function hasMany(value, f) {
    return acceptBlank(value, [], _1 =>
        acceptCommaSeparated(_1, _2 =>
            acceptArrayOrMap(_2, _3 => _3.forEach(f))));
}

function optional(result, next) {
    return (data) => {
        if (!data) return result;
        return next(data);
    };
}

function acceptBlank(data, result, next) {
    if (!data) return result;
    return next(data);
}

function commaSeparated(next) {
    return (data) => acceptCommaSeparated(data, next);
}

function acceptCommaSeparated(data, next) {
    return next(isString(data) ? data.split(COMMA_SEPARATED) : data);
}

function arrayOnly(message, f) {
    return (data) => {
        return onlyAcceptArray(data, message, f);
    }
}

function onlyAcceptArray(data, message, f) {
    if (!Array.isArray(data)) throw message;
    return data.map(f);
}


function acceptArrayOrMap(data, handle) {
    if (Array.isArray(data)) return handle(data);
    handle(Object.keys(data).map(function (key) {
        let result = {};
        result[key] = data[key];
        return result;
    }));
}

export default yaml;

