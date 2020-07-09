import {JSDOM} from "jsdom";
import * as d3 from "d3-selection";
import model from "../src/model";

describe("Model rendering", () => {

    test("should render model to a group", () => {
        let document = dom();
        model(d3.select(document.body), [{
            id: "Order",
            archetype: "contract",
            attributes: []
        }]);

        let contracts = document.querySelectorAll(".contract");
        expect(contracts.length).toBe(1);

        let background = contracts[0].querySelectorAll(".background");
        expect(background.length).toBe(1);
        attrs(background[0], {x: 0, y: 0, rx: 10, ry: 10, width: 400, height: 300});
    });
})

function attrs(target, expected) {

    for (let name of Object.keys(expected)) {
        expect(attr(target, name.toString())).toBe(expected[name].toString());
    }
}

function attr(target, name) {
    return target.attributes.getNamedItem(name).value
}

function dom(html) {
    return (new JSDOM(html || "")).window.document;
}
