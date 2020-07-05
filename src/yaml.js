import json from "./json";
import {isString} from "./utils";

const yaml = {
    required: {
        timestamp: function (entity) {
            return acceptCommaSeparated(entity.key_timestamps, _1 =>
                onlyAcceptArray(_1, `${entity.id} must have timestamps`, _2 =>
                    _2.map(json.attr.timestamp)));

        }
    },
    optional: {
        desc: (entity) => acceptBlank(entity.desc, '', _ => _),
        timestamp: (entity) => acceptBlank(entity.key_timestamps, [], _ => yaml.required.timestamp(entity)),
        data: (entity) => acceptBlank(entity.key_data, [], _1 =>
            acceptCommaSeparated(_1, _2 =>
                onlyAcceptArray(_2, `${entity.id} have malformed data declaration`, _3 =>
                    _3.map(json.attr.data)))),
        details: (entity, f) => hasMany(entity.details, f),
        fulfillment: (entity, f) => hasMany(entity.fulfillment, f),
    }
}

function hasMany(value, f) {
    return acceptBlank(value, [], _1 =>
        acceptCommaSeparated(_1, _2 =>
            acceptArray(_2, _3 => _3.forEach(f), _4 =>
                acceptMap(_4, _5 => _5.forEach(f)))));
}

function acceptBlank(data, result, next) {
    if (!data) return result;
    return next(data);
}

function acceptCommaSeparated(data, next) {
    return next(isString(data) ? data.split(/[ ]*,[ ]*/) : data);
}

function onlyAcceptArray(data, message, next) {
    if (!Array.isArray(data)) throw message;
    return next(data);
}

function acceptArray(data, handle, next) {
    if (Array.isArray(data)) return handle(data);
    return next(data);
}

function acceptMap(data, next) {
    next(Object.keys(data).map(function (key) {
        let result = {};
        result[key] = data[key];
        return result;
    }));
}

export default yaml;

