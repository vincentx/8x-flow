import {JSDOM} from "jsdom";

export function attrs(target, expected) {
    for (let name of Object.keys(expected)) {
        expect(attr(target, name.toString())).toBe(expected[name].toString());
    }
}

export function attr(target, name) {
    return target.attributes.getNamedItem(name).value;
}

export function dom(html) {
    return (new JSDOM(html || "")).window.document;
}
